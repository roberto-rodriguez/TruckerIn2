import React, { Component } from "react";
import {  View, StyleSheet} from "react-native";
import { Container} from "native-base";
import { connect } from "react-redux";
import { Row, Column, T13, T14, BlockButton, nav, AgentMsg} from 'src/components/'
import theme from 'src/theme/variables/platform';
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

class About extends Component {

  t = key => I18n.t(['profile', 'about', key])

  render() {
     var t = this.t
     var {about, isMe, navigation} = this.props

        return (
          <Container>
            {(isMe && !about) && this.buildEmptyCmp() }

            <BlockButton show={isMe} text={'Edit'}  onPress={() => nav(navigation, 'EditAbout', {about})}/>

          <View style={{margin: 20}}>
              <T14>
                {about}
              </T14>
            </View>
           </Container>)

  }

  buildEmptyCmp (){
    var {navigation, roleId} = this.props

        return (
          <AgentMsg  onPress={()=> nav(navigation, 'EditProfileExperience')}  >
            <View>
              <T14 green>{I18n.t(['signup', 'about', roleId === roles.BROKER ? 'descBroker' : 'descCompany'])}</T14>
            </View>
          </AgentMsg>
        )
    }

}

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var isMe = ownProps.isMe;
  var profileInfo = isMe ? globalReducer.profileInfo : profileReducer.profileInfo
 
  return {
    isMe,
    about: profileInfo.about,
    roleId: profileInfo.roleId
  }
}

  export default connect(mapStateToProps)(About);
