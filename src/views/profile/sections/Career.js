import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Container, Button } from "native-base";
import {BlockButton, AgentMsg,Row,Column, T14, nav} from 'src/components/'
import { connect } from "react-redux";
import CareerItem from './CareerItem'
import theme from 'src/theme/variables/platform'
import I18n from 'react-native-i18n'
//TODO remove npm install react-native-easy-grid --save



class Career extends Component {

  render() {
    var {careerHistory, isMe, navigation} = this.props
    return (
       <Container>
       <Row>
         <Column>
           <T14 green>Recent laboral experience</T14>
         </Column>
       </Row>
       <BlockButton show={isMe} text={I18n.t('profile.career.addLab')}  onPress={() => nav(navigation, 'EditProfileAddExperience')}/>

       {( careerHistory && careerHistory.length > 0) ?
         this.buildCareerList(isMe) : this.buildEmptyCmp()
       }

      </Container>
    );
  }

  buildCareerList( ){
    var {navigation, isMe} = this.props

    return (
      <View>
        {this.props.careerHistory.slice(0,2).map((careerItem, i) =>
          <CareerItem
            key={i} careerItem={careerItem}
            isMe={isMe}
            navigation={navigation}
          />)}
          <Button full transparent onPress={() => nav(navigation, 'ProfileCareerList', { isMe })}>
            <Text style={{ color: theme.secondaryColor }}>
              {I18n.t('profile.seeMore')}
            </Text>
          </Button>
      </View>
    )
  }

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

  const mapStateToProps = ({profileReducer}) => ({
      careerHistory: Object.values(profileReducer.profileCareer.careerHistory),
      lang: globalReducer.config.lang
    })

  export default connect(mapStateToProps)( Career);
