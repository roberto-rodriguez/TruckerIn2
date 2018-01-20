/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {   Text, Item } from "native-base";
import styles from './styles'

export default class Title extends Component {
  render(){
    return (
      <Item style={{backgroundColor: global.primaryColor}}>
        <Text style={styles.title}>{this.props.title}</Text>
      </Item>
    )
  }
}
