/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View,   Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'

 export default class CustomButton extends Component {

  render() {
    var {white, small, text, icon, radius, style, handler, textStyle} = this.props;

    if(!text && !icon){ //By default is edit button
      icon = 'edit';
      small = true;
      white = true;
      radius = true;
    }

  var buttonColor = white ? styles.white : styles.green,
  textColor = {color: white ? global.secondaryColor : 'white'},
  buttonSize = small ? styles.small: styles.medium,
  customStyle = {};

  switch(radius){
    case false:
      customStyle['borderRadius'] = 0;
      break;
    case 'left':
      customStyle['borderTopLeftRadius'] = 4;
      customStyle['borderBottomLeftRadius'] = 4;
      break;
    case 'right':
      customStyle['borderTopRightRadius'] = 4;
      customStyle['borderBottomRightRadius'] = 4;
      break;
    default:
      customStyle['borderRadius'] = 4;
  }

  var textElement= text ? (<Text style={[styles.text, textColor, textStyle]}>{text}</Text>) : null;
  var iconElement = icon ? ( <Icon name={icon} style={[styles.icon, textColor, textStyle]}/> ) : null;

    return (
      <TouchableHighlight  underlayColor={ 'transparent' }  style={[styles.button, buttonSize, buttonColor, customStyle, style]}  onPress={handler}>
        <View style={{alignItems:'center'}}>
         {iconElement}
         {textElement}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:11,
    textAlign: 'center',
    textAlignVertical: "center",
    width:'100%',
    marginLeft:0
  },
  button:{
    padding:0,
    height:30,
    width:60,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1
  },
  green:{
    borderColor:theme.secondaryColor,
    backgroundColor: theme.secondaryColor
  },
  white:{
    borderColor: theme.secondaryColor,
    backgroundColor: 'white',
    margin:1
  },
  medium:{
    height:30, width:60
  },
  small:{
    height:28,   width:40
  },
  icon:{
    alignItems:'center'
  }
})
