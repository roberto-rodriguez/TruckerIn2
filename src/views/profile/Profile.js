import React, { Component } from "react";
import { Image, View, TouchableOpacity,ScrollView, Dimensions } from "react-native";
import { Container, Content, Text, Thumbnail, H1, H2, H3, Spinner } from "native-base";
import {Header,Row, Column, TransparentButton,ConnectButton, Button, T13, T11, nav, Avatar } from 'src/components/'
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'
import Icon from 'react-native-fa-icons';
import styles from "./styles";
import * as roles from 'src/components/c/Role'

const deviceWidth = Dimensions.get("window").width;

import Information from './sections/Information'
import Experience from './sections/Experience'
import Career from './sections/Career'
import Connections from './sections/Connections'
import About from './sections/About'
import PostedJobs from './sections/PostedJobs'

const coverImg = require("../../../assets/cover.png");
const commonColor = require("src/theme/variables/commonColor");

var driverSections = [
  {name: 'profileInfo', icon: 'phone-square', title: 'contact' },
  {name: 'profileExperience', icon: 'truck', title: 'experience' },
  {name: 'profileCareer', icon: 'graduation-cap', title: 'career' },
  {name: 'connections', icon: 'group', title: 'connections', showSubText: true, badge: 'connectionsCount'},
  {name: 'aboutMe', icon: 'user-secret', title: 'aboutMe' },
  {name: 'aboutUs', icon: 'bank', title: 'aboutUs' },
  {name: 'postedJobs', icon: 'truck', title: 'postedJobs', showSubText: true}
]


class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedSection: null
      };
    }

componentDidMount(){
  var _this = this;

  setTimeout(() => _this.props.loadProfile(this.props.userId || this.props.id), 200)
}

  render() {
    var _this = this;
    var selectedSection = this.state.selectedSection;

    const {
        isMe,
        id,
        name,
        role,
        roleId,
        profileImg,
        location,
        connectionsCount,
        navigation
      } = this.props


    var profileOptions = driverSections.filter((data, i) => {
        switch(roleId){
          case roles.DRIVER: return i < 4
          case roles.BROKER: return (i === 0) || (data.name === 'aboutMe') || (data.name === 'postedJobs')
          case roles.COMPANY:return (i === 0) || (data.name === 'aboutUs') || (data.name === 'postedJobs')
        }
        return false; //Provissional
    }).map((data, i) => {
      if(!selectedSection && i === 0)selectedSection = data.name;  //For the first time

      return (
      <TouchableOpacity transparent key={i} style={styles.optionBtn} onPress={() => _this.setState({selectedSection: data.name})}>
        <Icon name={data.icon} style={[styles.headerIcon, _this.buildStyle(selectedSection ? selectedSection === data.name : i === 0)]}/>
      <Text style={[styles.optionText, _this.buildStyle(selectedSection ? selectedSection === data.name : i === 0)]}>{I18n.t(['profile', 'titles', data.title])}</Text>
    {data.badge &&
      (<View style={styles.IconBadge}>
        <Text  style={[styles.IconBadgeText, {fontSize: (this.props[data.badge] > 9 ? 10 : 12), paddingTop:  (this.props[data.badge] > 9 ? 2 : 0)}]}>
         {this.props[data.badge]}
        </Text>
      </View>)
    }
      </TouchableOpacity>)
    })

    return (
      <Container>
        <Content fullscreen>
        <Header
          navigation={navigation}
          back
          title={I18n.t('profile.title')}
          right={isMe ?
              <Button text={I18n.t('profile.edit')} handler={() => nav(navigation, 'EditProfile')} style={styles.topBarButton}/>
            : <Button text={I18n.t('profile.message')} handler={()=> nav(navigation, 'Chat', {id, name})} style={styles.topBarButton}/>}
        />

          <View style={styles.coverBlock}>
            <Image source={coverImg} style={styles.coverImage} />
          </View>

          <View>
            <View style={styles.profileImgInnerView}>
            <TouchableOpacity style={styles.profileImg}  onPress={()=>{}}>
              <Avatar name={name} src={profileImg} size={(deviceWidth / 2 - 10)} square/>
            </TouchableOpacity>

            {isMe && <TouchableOpacity style={styles.editProfileButton}  onPress={()=>this.props.changeProfilePricture()}>
                        <Icon name='camera'  style={styles.editProfileIcon}/>
                      </TouchableOpacity>}
            </View>


          </View>

          <Row h={70}/>
          <Row h={40}>
            <H3 style={styles.name}>{name}</H3>
          </Row>
          <Row  h={60}>
            <Column  h={60} columns={5}>

            </Column>
            <Column h={60} columns={5} colspan={3}>
              <T13 light>{role}</T13>
              <Text style={styles.pendingPostText}>{location}</Text>
            </Column>
            <Column h={40} columns={5} style={{marginTop:15}}>
              {!isMe && <ConnectButton status={''} name={name} contactId={id}/>}
            </Column>
          </Row>

          {
          (profileOptions && profileOptions.length > 0) ? (<View style={styles.optionsContainerView}>{profileOptions}</View>) :  (<Spinner color={commonColor.secondaryColor} />)
          }


          {this.buildSection(selectedSection, isMe, navigation, id)}

          </Content>
      </Container>
    );
  }

  // <TransparentButton border text={'Friends 10'} style={{padding:10}} textStyle={{fontSize:11}}/>

  buildSection(selectedSection, isMe, navigation, id){
    switch(selectedSection){
      case 'profileInfo': return (<Information isMe={isMe} id={id} navigation={navigation}/>)
      case 'profileExperience': return (<Experience isMe={isMe} id={id} navigation={navigation}/>)
      case 'profileCareer': return (<Career isMe={isMe} id={id} navigation={navigation}/>)
      case 'connections': return (<Connections isMe={isMe} id={id} navigation={navigation}/>)
      case 'postedJobs': return (<PostedJobs isMe={isMe} id={id} navigation={navigation} id={id}/>)
      case 'aboutMe':
      case 'aboutUs': return (<About isMe={isMe} id={id} navigation={navigation}/>)
    }
  }

  buildSubText(selectedSection, isMe){

    switch(selectedSection){
      case 'connections': return this.props.connectionsCount
      case 'aboutMe':
      case 'aboutUs':
      case 'profileCareer': return ''
      case 'postedJobs': return this.props.postedJobs
      default:
        return this.props[selectedSection + 'Completion'] + ' %'
    }
  }

  buildStyle(selected){
    var style = {}
    if(selected){
      style['color'] = '#658ECE';
    }
    return style;
  }
}



  const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
    var session = globalReducer.profileInfo
    var userInfo = ownProps.navigation.state.params && ownProps.navigation.state.params.userInfo || session

    var id = userInfo.userId || userInfo.id
    var isMe = id === session.id;
    var profileInfo = isMe ? globalReducer.profileInfo : (profileReducer[ id ] || {} ).profileInfo

    profileInfo = profileInfo || {}

    return {
      isMe,
      id,
      name: isMe ? session.firstName + ' ' + session.lastName : userInfo.userName,
      role: userInfo.role || profileInfo.role,
      roleId: userInfo.roleId || profileInfo.roleId,
      profileImg:  isMe ? session.profileImg : userInfo.profileImg,
      location: userInfo.locationName || (profileInfo.location && profileInfo.location.locationName),
      connectionsCount: profileInfo.connections,
  //    postedJobs: profileInfo.postedJobs,
      lang: globalReducer.config.lang
    }

  }

  export default connect(mapStateToProps, profileActions)(Profile);
