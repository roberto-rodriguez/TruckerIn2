import React, { Component } from "react";
import {  View, StyleSheet} from "react-native";
import { Container} from "native-base";
import { connect } from "react-redux";
import { Row, Column, T13, T14, BlockButton, nav, AgentMsg} from 'src/components/'
import theme from 'src/theme/variables/platform';
import I18n from 'react-native-i18n'

class Experience extends Component {

  t = key => I18n.t(['profile', 'experience', key]) + ':'

  render() {
     var t = this.t
     var {profileExperience, isMe, navigation} = this.props

        return (
          <Container>
            {isMe &&  (!profileExperience.completion || profileExperience.completion < 99) && this.buildEmptyCmp() }

            <BlockButton show={isMe} text={'Edit'}  onPress={() => nav(navigation, 'EditProfileExperience')}/>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13>{t('experience')}</T13>
               </Column>
               <Column columns={2}>
                 <T13>{profileExperience.experience}</T13>
               </Column>
             </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13>{t('equipment')}</T13>
               </Column>
               <Column columns={2}>
                 <T13>{profileExperience.equipment}</T13>
               </Column>
             </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13>{t('ownerOperator')}</T13>
               </Column>
               <Column columns={2}>
                 <T13>{this.getValString(profileExperience.ownerOperator)}</T13>
               </Column>
             </Row>

             <Row spaceBetween>
               <Column start columns={2}>
                 <T13>{t('hasCDL')}</T13>
               </Column>
               <Column columns={2}  >
                 <T13>{this.getValString(profileExperience.cdl)}</T13>
               </Column>
             </Row>

             <Row h={60} spaceBetween>
               <Column  h={60} start columns={2}>
                 <T13>{t('recentOver')}</T13>
               </Column>
               <Column  h={60} columns={2}  >
                 <T13>{this.getValString(profileExperience.overRoadExp)}</T13>
               </Column>
             </Row>

             <Row  h={60} spaceBetween>
               <Column  h={60} start columns={2}>
                 <T13>{t('wouldOver')}</T13>
               </Column>
               <Column  h={60}   columns={2} >
                 <T13>{this.getValString(profileExperience.willTakeOverRoad)}</T13>
               </Column>
             </Row>
           </Container>)

  }

  buildEmptyCmp (){
        return (
          <AgentMsg  onPress={()=> nav(this.props.navigation, 'EditProfileExperience')}  >
            <View>
              <T14 green>{this.t('emptyText')}</T14>
            </View>
          </AgentMsg>
        )
    }

  getValString(val){
    switch(val){
      case 1: return 'YES'
      case 2: return 'NO'
      default: return '-'
    }
  }
}

const style = StyleSheet.create({
  smallIcon: {fontSize:15, margin: 10, marginTop:12}
})

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var isMe = ownProps.isMe;
  var profileExperience = isMe ? globalReducer.profileExperience : profileReducer.profileExperience

  return {profileExperience}
}

  export default connect(mapStateToProps)(Experience);
