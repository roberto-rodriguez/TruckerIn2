import React, { Component } from "react";
import { View , Text } from 'react-native';
import { Container, Content } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, ListItem, AgentImg} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";

import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'


const commonItems = [
  { icon: 'user-circle-o',   title: 'contactInfo', route:'EditProfileInformation', prop:'profileInfo', redable:true}
]

const additionalItems = [
  [   //DRIVER
    { icon: 'truck',   title: 'experience', route:'EditProfileExperience', prop: 'profileExperience', redable:true},
    { icon: 'graduation-cap',   title: 'career', route:'EditProfileCareer', prop: 'profileCareer'}
  ],
  [   // BROKER
    { icon: 'user-secret', title:'aboutMe', route:'EditAbout', prop: 'about', sendParamAbout: true}
  ],
  [   // COMPANY
    { icon: 'bank', title:'aboutUs', route:'EditAbout', prop: 'about',sendParamAbout: true}
  ]
]


class EditProfile extends Component {

  render() {
    var {navigation, profileInfoCompletion, profileExperienceCompletion, roleId, about} = this.props

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('profile.editProfile.title')}/>
        <Content fullscreen >
        <AgentImg text={I18n.t('profile.editProfile.header')}/>


          <View >
             {
              commonItems.concat( additionalItems[roleId - 1] ).map( ({icon, title, prop, route, redable, param, sendParamAbout}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={redable && this.getSubText(i, prop)}
                 value={I18n.t(['profile', 'titles', title])}
                 routeName= {route}
                 params= { sendParamAbout ? {about} : {} }
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
    var percent =  props[prop + 'Completion']
    return 'Completed: ' +  percent + '%'
  }
}


  const mapStateToProps = ({profileReducer, globalReducer}) => ({
    roleId: globalReducer.profileInfo.roleId,
    about: globalReducer.profileInfo.about,
    location: profileReducer.profileInfo.location,
    locationId: profileReducer.profileInfo.locationId,
    profileInfoCompletion: globalReducer.profileInfo.completion,
    profileExperienceCompletion: globalReducer.profileExperience.completion,
    connectionsCount: profileReducer.connectionsCount,
    lang: globalReducer.config.lang
  })


  export default connect(mapStateToProps, profileActions)(EditProfile);
