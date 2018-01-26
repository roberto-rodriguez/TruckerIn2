import React, { Component } from "react";
import { StyleSheet, View, TextInput} from 'react-native';
import {StackView, AgentImg, RowColumn } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as settingsActions from './settings.actions'

class ContactUs extends Component {

  constructor(props){
    super(props)
    this.state = {
        text: ''
      }
   }

   onAccept = () => {
     var {navigation, contactUs} = this.props

     contactUs( this.state.text )
     navigation.goBack()
   }

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={'Contact Us'} onAccept={this.onAccept}>
        <AgentImg text={'We want to hear from you!. Leave us your message and we will get back to you as soon as possible.'}/>
        <View >
        <TextInput
            underlineColorAndroid='transparent'
           style={{textAlign:'left', margin:20, textAlignVertical: 'top', borderTopWidth: 0.2, borderTopColor: theme.secondaryColor}}
            placeholder={'Type your message here...'}
            multiline={true}
            numberOfLines={20}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
        </View>
      </StackView>
    )
  }
}


export default connect(null, settingsActions )(ContactUs);
