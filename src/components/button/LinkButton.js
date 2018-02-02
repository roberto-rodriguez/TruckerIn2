

import React, { Component } from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {T15} from 'src/components/'
import theme from 'src/theme/variables/platform'

 export default class LinkButton extends Component {

  render() {
    var { style, onPress, text} = this.props;

    return (
      <TouchableHighlight onPress={onPress}>
        <View>
          <T15 green style={[styles.editText, style]} >{text}</T15>
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  editText: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.secondaryColor
  }
})
