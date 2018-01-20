


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import styles from './style'

 export default class CustomText extends Component {

  render() {
    var { strong, light, green, fontSize, shortLine, style, onPress, red} = this.props;

    var textStyle = [styles.text, {fontSize}, style];

    if(strong){ textStyle.push(styles.strong)}
    if(light){ textStyle.push(styles.light)}
    if(shortLine){ textStyle.push(styles.shortLine)}
    if(green){textStyle.push(styles.color)}
    if(red){textStyle.push(styles.red)}

    return (
      <ReactNative.Text style={textStyle} onPress={onPress}>
        {this.props.children}
      </ReactNative.Text>
    );
  }
}
