
import React, { Component } from 'react'

import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';
import { Column, Avatar } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import Icon from 'react-native-fa-icons';
import I18n from 'react-native-i18n'

  class SendMsg  extends Component {

      constructor(props) {
          super(props)

          this.state = {
            msg: ''
          }
    }

    onChangeText = (msg) => this.setState({msg})

    onSendMessage = () => {
      this.props.onSendMessage( this.state.msg)
      this.setState({msg: ''})
    }

  render() {
    var {fullName, profileImg, placeholder} = this.props

      return (
        <View style={styles.msgWrap}>
          <Column columns={7} colspan={1} >
            <Avatar name={fullName} src={profileImg} size={40} />
          </Column>
          <Column columns={7} colspan={5} style={styles.messageText}>
            <TextInput underlineColorAndroid='transparent' style={styles.input}
              onChangeText={this.onChangeText}
              value={this.state.msg}
              placeholder={placeholder || I18n.t('general.sendMsg') }
             />
          </Column>
          <Column columns={7} colspan={1} style={styles.sendButtonWrap}>
            <TouchableHighlight  underlayColor={'transparent'} style={styles.sendButton} onPress={this.onSendMessage} >
                <View style={styles.sendIconWrap}>
                  <Icon name={'send'} style={{color:'white'}}/>
                </View>
              </TouchableHighlight>
          </Column>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  input:{
    width: '100%'
  },
  sendButton:{
    width:'100%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10
  },
  sendButtonWrap: {
    backgroundColor: theme.secondaryColor, borderTopRightRadius: 10, borderBottomRightRadius: 10
  },
  sendIconWrap:{alignItems:'center', marginTop: 10},
  messageText: {borderWidth: 0.5, borderColor: theme.secondaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
  msgWrap: {flexDirection: 'row', marginTop: 10}
    })

    const mapStateToProps = ({  globalReducer}) => {
      var profileInfo = globalReducer.profileInfo
debugger;
      return {
        profileImg: profileInfo.profileImg,
        fullName: profileInfo.firstName + ' ' + profileInfo.lastName
      }
    }

    export default connect(mapStateToProps)(SendMsg);
