import React, { Component } from "react";
import {  View, StyleSheet} from "react-native";
import { Container} from "native-base";
import { connect } from "react-redux";
import { Row, Column, T13, T14, BlockButton, nav, AgentMsg, parseConfig} from 'src/components/'
import theme from 'src/theme/variables/platform';
import I18n from 'react-native-i18n'

class Experience extends Component {

  t = key => I18n.t(['profile', 'experience', key]) + ':'

  render() {
     var t = this.t
     var {profileExperience, isMe, navigation, isDriver } = this.props

        return (
          <Container>
            <BlockButton show={isMe} text={'Edit'}  onPress={() => nav(navigation, 'EditProfileExperience')}/>

            <Row h={50}  spaceBetween>
              <Column start columns={2} h={50} >
                <T13 strong>{t(isDriver ? 'jobStatus' : 'hiringStatus')}</T13>
              </Column>
                <Column end  columns={2} h={50}  >
                <T13>{profileExperience.jobStatus}</T13>
              </Column>
            </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13 strong>{t('experience')}</T13>
               </Column>
               <Column end  columns={2}>
                 <T13>{profileExperience.experience}</T13>
               </Column>
             </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13 strong>{t('equipment')}</T13>
               </Column>
               <Column  end columns={2}>
                 <T13>{profileExperience.equipment}</T13>
               </Column>
             </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13 strong>{t('ownerOperator')}</T13>
               </Column>
               <Column  end columns={2}>
                 <T13>{this.getValString(profileExperience.ownerOperator)}</T13>
               </Column>
             </Row>

            <Row spaceBetween>
              <Column start columns={2}>
                <T13 strong>{t('distance')}</T13>
              </Column>
              <Column  end columns={2}>
                <T13>{ profileExperience.distance }</T13>
              </Column>
            </Row>
           </Container>)

  }

  // buildEmptyCmp (){
  //       return (
  //         <AgentMsg  onPress={()=> nav(this.props.navigation, 'EditProfileExperience')}  >
  //           <View>
  //             <T14 green>{this.t('emptyText')}</T14>
  //           </View>
  //         </AgentMsg>
  //       )
  //   }

  getValString(val){
    switch(val){
      case 1: return I18n.t('general.yes')
      case 2: return 'NO'
      default: return '-'
    }
  }
}

const style = StyleSheet.create({
  smallIcon: {fontSize:15, margin: 10, marginTop:12}
})

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var {id, isMe} = ownProps
  var profileExperience = isMe ? globalReducer.profileExperience : profileReducer[id].profileExperience
  var profileInfo = isMe ? globalReducer.profileInfo : profileReducer[id].profileInfo

  //var configs = parseConfig(['jobStatus', 'experience', 'equipment'],  profileInfo, profileExperience, globalReducer.config)

  return {
          profileExperience,
          isDriver: profileInfo.roleId === 1
        }
}

  export default connect(mapStateToProps)(Experience);
