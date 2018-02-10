import React, { Component } from "react";
import { Image, View, TouchableHighlight, StyleSheet, Text} from "react-native";
import { Container } from "native-base";
import { BlockButton, CustomButton, Row, Column, T11, T13, T14, AgentMsg, nav} from 'src/components/'
import Icon from 'react-native-fa-icons';
import { connect } from "react-redux";
import theme from 'src/theme/variables/platform';
import call from 'react-native-phone-call'
import I18n from 'react-native-i18n'

class Information extends Component {

  t = (key) => I18n.t(['profile', 'information',  key])

  render() {
    var {profileInfo, isMe } = this.props
    var t = this.t

    return (
       <Container>
           <BlockButton show={isMe} text={I18n.t('general.edit')}  onPress={() => nav(this.props.navigation, 'EditProfileInformation')}/>

           {
             (isMe || profileInfo.showPersonalInfo === 1) ?
             (
               <View>
                 <Row spaceBetween>
                   <Column start columns={5} colspan={2}>
                     <Icon name={"phone"} style={style.smallIcon}/>
                   <T13 strong>{t('phone') + ':'}</T13>
                   </Column>
                   <Column end columns={5} colspan={2}>
                     <T13>{profileInfo.phone}</T13>
                   </Column>
                   {
                     !isMe &&
                     (
                       <Column end columns={5} colspan={1}>
                         <CustomButton icon={"phone"} handler={() =>  call({ number: profileInfo.phone})}/>
                       </Column>
                     )
                   }

                 </Row>
                 <Row  spaceBetween>
                   <Column start columns={3}>
                     <Icon name={"envelope"} style={style.smallIcon}/>
                   <T13 strong>{t('email') + ':'}</T13>
                     </Column>
                     <Column end columns={3} colspan={2}>
                     <T13>{profileInfo.email}</T13>
                     </Column>
                </Row>
               </View>
             )
             :
             this.buildEmptyCmp()
           }

           {
             isMe &&
             <Row h={50}  spaceBetween>
               <Column start h={50} columns={4} colspan={3}>
                 <Icon name={"lock"} style={style.smallIcon}/>
                 <T13 strong>{t('showPersonalInfo')}  </T13>
               </Column>
               <Column end columns={4} h={50}>
                 <T13>{profileInfo.showPersonalInfo === 1 ? I18n.t('general.yes') : 'NO'}</T13>
               </Column>
             </Row>
           }

          </Container>
    );
  }

  buildEmptyCmp (){
       var {userId, firstName} = this.props.profileInfo
       var t = this.t

       return (
         <AgentMsg onPress={()=> nav(this.props.navigation, 'Chat', {id: userId, name: firstName})}  >
           <View>
             <T14 green>{t('notShowInfo')}</T14>
             <T11 green>{t('clickToMsg')}</T11>
           </View>
         </AgentMsg>
       )
    }
}

const style = StyleSheet.create({
  smallIcon: {fontSize:15, margin: 10, marginTop:12}
})

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var {id, isMe} = ownProps
  var profileInfo = isMe ? globalReducer.profileInfo : (profileReducer[id] || {}).profileInfo

  profileInfo = profileInfo || {}
  
  return { profileInfo }
}

  export default connect(mapStateToProps)(Information);
