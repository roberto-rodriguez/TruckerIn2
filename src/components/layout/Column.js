/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

 class Column extends Component {

  render() {
    var {style, columns = 1, colspan = 1, h, start, end} = this.props;

    var customStyle = columns ? {width: 100/columns * (colspan || 1) + '%'} : {}
    customStyle.height = h || 40

    if(start){
      customStyle.justifyContent = 'flex-start'
      customStyle.alignItems = 'center'
      customStyle.flexDirection = 'row'
    }

    if(end){
      customStyle.justifyContent = 'flex-end'
      customStyle.alignItems = 'center'
      customStyle.flexDirection = 'row'
    }

    return (
      <View style={[styles.column, customStyle, style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    height: '100%',
    width:'33%',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'transparent'
  }
})

export default Column;
