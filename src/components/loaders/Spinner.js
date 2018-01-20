/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator} from 'react-native';
import { Container } from "native-base";

 export default class Spinner extends Component {

  render() {
    return (
      <Container white>
        <ActivityIndicator size="large" color={"#EA0000"} style={styles.spinner}/>
      </Container>
    )
  }
}



const styles = StyleSheet.create({
    spinner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
