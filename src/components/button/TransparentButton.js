
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import theme from 'src/theme/variables/platform'
import Icon from 'react-native-fa-icons';

 export default class TransparentButton extends Component {

  render() {
    var { text, active, border, handler, color, style, textStyle} = this.props;
    var textColor = active || border || color ? global.secondaryColor : 'grey'
    var borderStyle = active ? styles.active : null

    if(border){
      borderStyle = styles.border
    }

    return (
      <TouchableHighlight underlayColor={'white'} style={[styles.button, borderStyle, style]}  onPress={handler}>
          <Text style={[styles.text, {color:textColor}, textStyle]}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:14,
    textAlign: 'center',
    textAlignVertical: "center",
    width:'100%',
    marginLeft:0
  },
  button:{
    padding:0,
    height:30,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  active:{
    borderBottomWidth: 1,
    borderBottomColor: theme.secondaryColor,
  },
  border:{
    borderWidth: 0.8,
    borderRadius:5,
    borderColor: theme.secondaryColor
  }
})
