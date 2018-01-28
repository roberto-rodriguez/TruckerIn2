
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'
import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";
import * as ConnectionStatus from 'src/components/c/ConnectionStatus'
import I18n from 'react-native-i18n'

 class ConnectButton extends Component {

   constructor(props){
     super(props)
     this.state = {
       connectionStatus: null
     }
   }

   componentWillMount(){
     this.setState({connectionStatus: this.props.connectionStatus})
   }

  doConnect = () => {
    if(!this.state.connectionStatus){ //If there no status, then is connect
      var {contactId, name} = this.props;

      this.props.doConnect(contactId, name, () => {
        this.setState({connectionStatus: ConnectionStatus.SENT})
      })
    }
  }

//TODO replace status by connectionStatus
  render() {
    var {style} = this.props;
    var {connectionStatus} = this.state

    var icon = 'user-plus'
    var text = I18n.t('cmp.connect')

    switch(connectionStatus){
      case ConnectionStatus.CONNECTED:
            icon = 'handshake-o'
            text = I18n.t('cmp.connected')
          break;
      // case 'pending':
      //       icon = ''
      //       text = 'Solicitud Pendiente'
      //     break;
      case ConnectionStatus.SENT:
            icon = ''
            text = I18n.t('cmp.reqSent')
          break;
    }

    return (
      <TouchableHighlight underlayColor={'transparent'} style={[styles.button, styles.border, style]}  onPress={this.doConnect}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{text}</Text>
          <Icon name={icon} style={styles.icon}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:10,
    textAlign: 'center',
    textAlignVertical: "center",
    width:'100%',
    marginLeft:0,
    color: theme.secondaryColor,
    padding:0,
    margin:0
  },
  button:{
    padding:0,
    height:40,
    width:60,
    //height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  wrapper:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  border:{
    borderWidth: 0.3,
    borderRadius:5,
    borderColor: 'grey'// global.secondaryColor
  },
  icon:{
    fontSize:13,
    color:theme.secondaryColor,
    padding:0,
    margin:0
  }
})

  export default connect(null, contactActions)(ConnectButton);
