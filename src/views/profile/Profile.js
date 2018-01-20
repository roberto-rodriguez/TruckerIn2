import React, { Component } from "react";
import { Image, View, TouchableOpacity,ScrollView, Dimensions } from "react-native";
import { Container, Content, Text, Thumbnail, H1, H2, H3 } from "native-base";
import {Header,Row, Column, TransparentButton,ConnectButton, Button, T13, T11, nav } from 'src/components/'
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import * as profileActions from "./reducer/profileActions";
import I18n from 'react-native-i18n'
import Icon from 'react-native-fa-icons';
import styles from "./styles";

import Information from './sections/Information'
import Experience from './sections/Experience'
import Career from './sections/Career'
import Connections from './sections/Connections'

const coverImg = require("../../../assets/cover.png");
//const profileImg = require("../../../assets/contacts/yo.png");

var buttonsData = [
  {name: 'profileInfo', icon: 'user-circle-o', title: 'information', privacity:'justMe'},
  {name: 'profileExperience', icon: 'truck', title: 'experience', privacity:'employer'},
  {name: 'profileCareer', icon: 'graduation-cap', title: 'career', privacity:'public'},
  {name: 'connections', icon: 'group', title: 'connections', privacity:'notMe'}
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

  setTimeout(() => _this.props.loadProfile( this.props.id), 200)
}

  render() {
    var _this = this;
    var selectedSection = this.state.selectedSection;

    const {
        isMe,
        id,
        name,
        role,
        profileImg,
        location,
        profileInfoCompletion,
        profileExperienceCompletion,
        connectionsCount,
        navigation
      } = this.props

      var profileCompleted = (profileInfoCompletion + profileExperienceCompletion)/2

    var profileOptions = buttonsData.filter((data) => {
        return true; //Provissional
    }).map((data, i) => {
      if(!selectedSection && i === 0)selectedSection = data.name;  //For the first time

      return (
      <TouchableOpacity transparent key={i} style={styles.optionBtn} onPress={() => _this.setState({selectedSection: data.name})}>
        <Icon name={data.icon} style={[styles.headerIcon, _this.buildStyle(selectedSection ? selectedSection === data.name : i === 0)]}/>
        <Text style={[styles.optionText, _this.buildStyle(selectedSection ? selectedSection === data.name : i === 0)]}>{I18n.t(['profile', data.title, data.title])}</Text>
        {isMe && <Text style={styles.extraSmallText}>{this.buildSubText(data.name, isMe)}</Text>}
      </TouchableOpacity>)
    })

    return (
      <Container>
        <Content fullscreen>
        <Header
          navigation={navigation}
          back
          title={I18n.t('profile.title')}
          right={isMe ? <Button text={I18n.t('profile.edit')} handler={() => nav(navigation, 'EditProfile')} style={styles.topBarButton}/> : <Button text={I18n.t('profile.message')} handler={()=> nav(navigation, 'Chat', {id, name})} style={styles.topBarButton}/>}
        />

          <View style={styles.coverBlock}>
            <Image source={coverImg} style={styles.coverImage} />
          </View>

          <View>
            <View style={styles.profileImgInnerView}>
            <TouchableOpacity style={styles.profileImg}  onPress={()=>alert('pic')}>
              <Image style={styles.profileImg} source={profileImg} />
            </TouchableOpacity>

            {isMe && <TouchableOpacity style={styles.editProfileButton}  onPress={()=>alert('Change')}>
                        <Icon name='camera'  style={styles.editProfileIcon}/>
                      </TouchableOpacity>}
            </View>


          </View>

          <Row h={70}/>
          <Row h={40}>
            <H3 style={{ width:'100%',textAlign:'center' }}>{name}</H3>
          </Row>
          <Row  h={60}>
            <Column  h={60} columns={5}>

            </Column>
            <Column h={60} columns={5} colspan={3}>
              <T13 light>{role}</T13>
              <Text style={styles.pendingPostText}>{location}</Text>
              <Text style={styles.extraSmallText}>{I18n.t('profile.completed') + profileCompleted + '%'} </Text>
            </Column>
            <Column h={40} columns={5} style={{marginTop:15}}>
              {!isMe && <ConnectButton status={''} name={name} handler={() => alert('Connect')}/>}
            </Column>
          </Row>

          <View style={styles.optionsContainerView}>
            {
              profileOptions
            }
          </View>

          {this.buildSection(selectedSection, isMe, navigation)}

          </Content>
      </Container>
    );
  }

  // <TransparentButton border text={'Friends 10'} style={{padding:10}} textStyle={{fontSize:11}}/>

  buildSection(selectedSection, isMe, navigation){
    switch(selectedSection){
      case 'profileInfo': return (<Information isMe={isMe} navigation={navigation}/>)
      case 'profileExperience': return (<Experience isMe={isMe} navigation={navigation}/>)
      case 'profileCareer': return (<Career isMe={isMe} navigation={navigation}/>)
      case 'connections': return (<Connections isMe={isMe} navigation={navigation}/>)
    }
  }

  buildSubText(selectedSection, isMe){
    switch(selectedSection){
      case 'connections': return this.props.connectionsCount
      case 'profileCareer': return ''
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

    var isMe = userInfo.id === session.id;
    var profileInfo = isMe ? globalReducer.profileInfo : profileReducer.profileInfo

    return {
      isMe,
      id: userInfo.userId || userInfo.id, //userId is when is comming from other page, like Job
      name: isMe ? session.firstName + ' ' + session.lastName : userInfo.userName,
      role: profileInfo.role,
      profileImg:  isMe ? session.profileImg : userInfo.profileImg,
      location: profileInfo.location,
      profileInfoCompletion: profileInfo.completion || 0,
      profileExperienceCompletion:  (isMe ? globalReducer.profileExperience.completion : profileReducer.profileExperience.completion) || 0,
      connectionsCount: profileReducer.connectionsCount,
      lang: globalReducer.config.lang
    }

  }

  export default connect(mapStateToProps, profileActions)(Profile);
