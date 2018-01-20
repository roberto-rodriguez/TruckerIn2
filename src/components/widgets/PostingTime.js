
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-fa-icons';
import {T11} from 'src/components/'

const commonColor = require("src/theme/variables/commonColor");

 export default class PostingTime extends Component {

  render() {
    var {style, text} = this.props;


    return (
      <View note style={[{flexDirection: "row" }, style]}>
        <T11 light shortLine>
          {text || 'Nov 1'}
        </T11>
        <Icon name='globe' style={styles.globeIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globeIcon: {
    fontSize: 11,
    marginLeft: 5,
    marginTop: 6,
    color: 'grey'
  }
})
