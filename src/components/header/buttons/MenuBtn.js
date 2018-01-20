/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button } from "native-base";
import styles from '../styles'
const chatContactsImg = require("../../../../assets/chatcontacts.png");

export default class MenuBtn extends Component {
  render(){
    return (<Button transparent
              style={styles.leftBtn}
              onPress={() => this.props.navigation.navigate( 'DrawerOpen' )} >
              <Image source={chatContactsImg} style={styles.sidebarIcon} />
            </Button>)
  }
} 
