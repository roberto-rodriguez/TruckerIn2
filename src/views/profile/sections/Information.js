import React, { Component } from "react";
import { Image, View, TouchableHighlight, StyleSheet, Text} from "react-native";
import { Container } from "native-base";
import { BlockButton, CustomButton, Row, Column, T11, T13, T14, AgentMsg, nav} from 'src/components/'
import Icon from 'react-native-fa-icons';
import { connect } from "react-redux";
import theme from 'src/theme/variables/platform';
import call from 'react-native-phone-call'

class Information extends Component {

  render() {
    var profileInfo = this.props.profileInfo
    var isMe = this.props.isMe

    return (
       <Container>
           <BlockButton show={isMe} text={'Edit'}  onPress={() => nav(this.props.navigation, 'EditProfileInformation')}/>

           {
             (isMe || profileInfo.showPersonalInfo === 1) ?
             (
               <View>
                 <Row spaceBetween>
                   <Column start columns={5} colspan={2}>
                     <Icon name={"phone"} style={style.smallIcon}/>
                     <T13 strong>Phone:</T13>
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
                     <T13 strong>Email:</T13>
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
           <Row h={50}  spaceBetween>
             <Column start h={50}   columns={3}>
               <Icon name={"hourglass-end"} style={style.smallIcon}/>
               <T13 strong>Job Status:</T13>
             </Column>
               <Column end  columns={3} colspan={2} h={50}  >
               <T13>{profileInfo.jobStatus}</T13>
             </Column>
           </Row>
           {
             isMe &&
             <Row h={50}  spaceBetween>
               <Column start h={50} columns={3} colspan={2}>
                 <Icon name={"lock"} style={style.smallIcon}/>
                 <T13 strong>Show contact information:</T13>
               </Column>
               <Column end columns={3} h={50}>
                 <T13>{profileInfo.showPersonalInfo === 1 ? 'YES' : 'NO'}</T13>
               </Column>
             </Row>
           }

          </Container>
    );
  }

  buildEmptyCmp (){
       var {userId, firstName} = this.props.profileInfo

       return (
         <AgentMsg onPress={()=> nav(this.props.navigation, 'Chat', {id: userId, name: firstName})}  >
           <View>
             <T14 green>This user prefers to not show his contact information.</T14>
             <T11 green>( Click here to send him a message )</T11>
           </View>
         </AgentMsg>
       )
    }
}

const style = StyleSheet.create({
  smallIcon: {fontSize:15, margin: 10, marginTop:12}
})

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var isMe = ownProps.isMe;
  var profileInfo = isMe ? globalReducer.profileInfo : profileReducer.profileInfo
  return {profileInfo}
}

  export default connect(mapStateToProps)(Information);
