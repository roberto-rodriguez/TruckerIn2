import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Container, Button } from "native-base";
import {BlockButton, AgentMsg,Row,Column, T12, T13, T14, nav} from 'src/components/'
import { connect } from "react-redux";
import CareerItem from './CareerItem'
import theme from 'src/theme/variables/platform'
import I18n from 'react-native-i18n'
//TODO remove npm install react-native-easy-grid --save



class Career extends Component {

  edit = (item) =>  this.props.isMe && nav(this.props.navigation, 'EditProfileAddExperience', {item, userId: this.props.id})

  render() {
    var {careerHistory, isMe, navigation, id} = this.props
    return (
       <Container>
       <Row>
         <Column>
           <T14 green>{I18n.t('profile.career.recentLabExp')}</T14>
         </Column>
       </Row>
       <BlockButton show={isMe} text={I18n.t('profile.career.addLab')}  onPress={() => nav(navigation, 'EditProfileAddExperience')}/>

       {( careerHistory && careerHistory.length > 0) ?
           this.props.careerHistory.reverse().slice(0, 2).map((item, i) =>

           <TouchableOpacity style={styles.item} onPress={() => this.edit(item)} key={i}>
             <View>
               <T13 strong>{item.company}</T13>
               <T12 light>{item.fecha}</T12>
               <T12>{item.description}</T12>
             </View>
           </TouchableOpacity> )
         :
         this.buildEmptyCmp()
       }

       { careerHistory && careerHistory.length > 2 &&
         (
           <Button full transparent onPress={() => nav(navigation, 'ProfileCareerList', { id })}>
             <Text style={{ color: theme.secondaryColor }}>
               {I18n.t('profile.seeMore')}
             </Text>
           </Button>
         )
       }

      </Container>
    );
  }

  // buildCareerList( ){
  //   var {navigation, isMe} = this.props
  //
  //   return (
  //     <View>
  //       {this.props.careerHistory.map((careerItem, i) =>
  //         <CareerItem
  //           key={i} careerItem={careerItem}
  //           isMe={isMe}
  //           navigation={navigation}
  //         />)}

  //     </View>
  //   )
  // }

  buildEmptyCmp(){
    var isMe = this.props.isMe

    if(isMe){
      return (
        <AgentMsg>
          <View>
            <T14 green>{I18n.t('profile.career.emptyIsMe')}</T14>
          </View>
        </AgentMsg>
        )
    }else{
      return (
        <AgentMsg>
          <View>
            <T14 green>{I18n.t('profile.career.emptyNoMe')}</T14>
          </View>
        </AgentMsg>
      )
    }
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-start',
    borderWidth:0.2,
    borderColor:'grey',
    padding:10,
    borderRadius:5,
    margin:8
  }
})

  const mapStateToProps = ({profileReducer}, ownProps) => {
      var {id} = ownProps
      var userInfo = profileReducer[id] || {}
      var profileCareer = userInfo.profileCareer || {}
      return {
        id,
        careerHistory: Object.values( profileCareer )
      }
    }

  export default connect(mapStateToProps)( Career);
