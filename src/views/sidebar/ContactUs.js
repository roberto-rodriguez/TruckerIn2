import React, { Component } from "react";
import { StyleSheet, View, TextInput} from 'react-native';
import {StackView, AgentImg, RowColumn } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as settingsActions from './settings.actions'
import I18n from 'react-native-i18n'

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
      <StackView navigation={navigation} title={I18n.t('settings.contact.title')} onAccept={this.onAccept}>
        <AgentImg text={I18n.t('settings.contact.text')}/>
        <View >
        <TextInput
            underlineColorAndroid='transparent'
           style={{textAlign:'left', margin:20, textAlignVertical: 'top', borderTopWidth: 0.2, borderTopColor: theme.secondaryColor}}
            placeholder={I18n.t('general.typeHere')}
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
