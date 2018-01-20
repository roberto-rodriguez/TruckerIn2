


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';
const lightTextColor = require("src/theme/variables/commonColor").lightTextColor;

 export default class Subtitle extends Component {

  render() {
    return (
      <Text style={[styles.text, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: lightTextColor,
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth:0.3,
    borderBottomColor:'rgba(211, 211, 211, 0.9)'
  }
});
