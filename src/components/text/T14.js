

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import CustomText from './CustomText'

 export default class T14 extends Component {

  render() {
    return (
      <CustomText {...this.props} fontSize={14}/>
    );
  }
}
