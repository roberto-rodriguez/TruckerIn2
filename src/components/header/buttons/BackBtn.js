/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Icon, Button} from "native-base";

 export default class BackBtn extends Component {

  render() {
    var {navigation, onBack} = this.props;

    return (
      <Button transparent onPress={onBack || (() => navigation.goBack())}>
        <Icon name="arrow-back" />
      </Button>
    );
  }
}
