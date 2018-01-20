/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from "native-base";
import {CustomButton, Row,Column, T11, EditLink} from 'src/components/'
import Icon from 'react-native-fa-icons';

//
 class PrivacityEditBar extends Component {

  render() {
    return (
        <Row h={40} spaceBetween style={styles.row}>
          <Column start columns={5} colspan={4}>
            <Text style={[styles.text]}>
              <Icon name={"lock"} style={styles.icon}/>
              <Text style={[styles.text, {fontWeight: "bold", paddingLeft:4}]}>{' Privacidad: '}</Text>
              {'Mostrar solo en aplicaciones de trabajo'}
            </Text>
          </Column>

         <EditLink/>
        </Row>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    opacity: 0.9,
    paddingHorizontal: 15
  },
  text:{
    color:"grey",
    fontSize:10
  },
  icon:{
    fontSize:9
  }
});

export default PrivacityEditBar;
