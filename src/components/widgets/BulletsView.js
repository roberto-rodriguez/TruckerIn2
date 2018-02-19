/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native';
import {T12} from 'src/components/'

 class BulletsView extends Component {

  render() {
    var {text} = this.props;
    return (
      <View>
       {text.split('.').map((item, i) => (<T12  key={i}>{' • ' + item}</T12>))}
      </View>
    );
  }
}



export default BulletsView;
