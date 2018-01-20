/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight} from 'react-native';

 export default class SimpleButton extends Component {


  render() {
    return (
      <TouchableHighlight  
      underlayColor={'transparent'} {...this.props}>
          {this.props.children}
      </TouchableHighlight>
    );
  }
}
