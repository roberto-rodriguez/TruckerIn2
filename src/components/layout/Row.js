/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

 class Row extends Component {

  render() {
    var {style, h ,spaceBetween, fullWidth} = this.props;

 var customStyle = {height: h || 50}
 if(spaceBetween)customStyle.justifyContent = "space-between"

 if(fullWidth){
   heightStyle.marginHorizontal = 0
 }

    return (
      <View style={[styles.row, customStyle, style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal:15,
    paddingVertical:0,
    flexDirection: 'row'
  }
})

export default Row;
