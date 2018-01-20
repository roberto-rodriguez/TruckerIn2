import React, { Component } from "react";
import { StyleSheet, Image,View , Text, TouchableHighlight} from 'react-native';
import { Container, Content, Thumbnail } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T16, T12, T13, Column, TransparentButton, ListItem, Select, InputListItem, AgentImg} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
const agentImg = require("../../../../assets/contacts/agent.jpg");
import I18n from 'react-native-i18n'

const items = [
  { icon: 'user-circle-o',   title: 'information', route:'EditProfileInformation', prop:'profileInfo', redable:true},
  { icon: 'truck',   title: 'experience', route:'EditProfileExperience', prop: 'profileExperience', redable:true},
  { icon: 'graduation-cap',   title: 'career', route:'EditProfileCareer', prop: 'profileCareer'},
  { icon: 'group',   title: 'connections', route:'EditProfileConnections', prop: 'connections'}
]

class EditProfile extends Component {

  constructor(props) {
      super(props)

      this.state = {
        connectionsCount: 12,
        profileInfo:{},
        profileExperience:{ },
        profileCareer:{}
       }
 }


//this is just for location
 setVal(prop, val, valId) {
   if(!val)return;


   this.props.saveProfileInfo({
     [prop]: val,
     [prop + 'Id']: valId
   })
 }

  render() {
    var {navigation, profileInfoCompletion, profileExperienceCompletion} = this.props

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('profile.editProfile.title')}/>
        <Content fullscreen >
        <AgentImg text={I18n.t('profile.editProfile.header')}/>


          <View >
             {
              items.map( ({icon, title, prop, route, redable}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={this.getSubText(i, prop)}
                 value={I18n.t(['profile', title])}
                 routeName= {route}
                 params= {{ setVal: (prop, val, valId) => this.setVal(prop, val, valId)}}
                 red= {redable && this.props[prop + 'Completion'] < 100}
                 />) )
            }
         </View>

        </Content>
      </Container>
    );
  }

  getSubText(i, prop){
    var props = this.props
    var percent = 0

    switch(i){
      // case 0:
      //   return props['location']
      case 2:
        return null;
      case 3:
        return I18n.t('profile.editProfile.view') + props.connectionsCount +  I18n.t('profile.editProfile.connections')
      default:
         percent =  props[prop + 'Completion']
    }

    return 'Completed: ' +  percent + '%'
  }
}


  const mapStateToProps = ({profileReducer, globalReducer}) => ({
    location: profileReducer.profileInfo.location,
    locationId: profileReducer.profileInfo.locationId,
    profileInfoCompletion: globalReducer.profileInfo.completion,
    profileExperienceCompletion: globalReducer.profileExperience.completion,
    connectionsCount: profileReducer.connectionsCount,
    lang: globalReducer.config.lang
  })


  export default connect(mapStateToProps, profileActions)(EditProfile);
