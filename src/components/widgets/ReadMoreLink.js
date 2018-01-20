

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const commonColor = require("src/theme/variables/commonColor");
import theme from 'src/theme/variables/platform'

 export default class PostingTime extends Component {

  render() {
    var {  style} = this.props;

    var textStyle = [styles.text, style];

    return (
      <ReactNative.Text style={textStyle}>
        Read More...
      </ReactNative.Text>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  text:{
    color: "#658ECE",
    lineHeight: ReactNative.Platform.OS === "ios" ? 20 : 22,
    textDecorationLine: "underline",
    fontSize: 13
  }
})
 
