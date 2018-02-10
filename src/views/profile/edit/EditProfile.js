import React, { Component } from "react";
import { View , Text } from 'react-native';
import { Container, Content } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, SimpleListItem, AgentImg, T14, RowColumn} from 'src/components/'
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
    { icon: 'graduation-cap',   title: 'career', route:'ProfileCareerList', prop: 'profileCareer'}
  ],
  [   // BROKER
    { icon: 'user-secret', title:'aboutMe', route:'EditAbout', prop: 'about', sendParamAbout: true}
  ],
  [   // COMPANY
    { icon: 'bank', title:'aboutUs', route:'EditAbout', prop: 'about',sendParamAbout: true}
  ]
]
//I18n.t('profile.editProfile.header')

class EditProfile extends Component {

  render() {
    var {navigation, name, roleId, about} = this.props

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('profile.editProfile.title')}/>
        <Content fullscreen >

           <AgentImg text={I18n.t('general.hi') + name}/>
           <RowColumn h={80}>
             <T14 green>{I18n.t('profile.editProfile.header1')}</T14>
           <T14 green>{I18n.t('profile.editProfile.header2')}</T14>
           </RowColumn>

          <View >
             {
              commonItems.concat( additionalItems[roleId - 1] ).map( ({icon, title, prop, route, redable, param, sendParamAbout}, i) => (
              <SimpleListItem
                 borderTop={i === 0}
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={I18n.t(['profile', 'titles', title])}
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

}


  const mapStateToProps = ({profileReducer, globalReducer}) => ({
    name: globalReducer.profileInfo.firstName,
    roleId: globalReducer.profileInfo.roleId,
    about: globalReducer.profileInfo.about,
    lang: globalReducer.config.lang
  })


  export default connect(mapStateToProps, profileActions)(EditProfile);
