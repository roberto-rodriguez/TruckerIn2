
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-fa-icons';
import {T11, formatDate} from 'src/components/'
import I18n from 'react-native-i18n'
const commonColor = require("src/theme/variables/commonColor");

 export default class PostingTime extends Component {

  render() {
    var {style, date} = this.props;


    return (
      <View >
        <View note style={[{flexDirection: "row" }, style]}>
          <Icon name='globe' style={styles.globeIcon} />
        <T11 light shortLine>{I18n.t('cmp.widgets.posted')}</T11>
        </View>
        <T11 light shortLine>{formatDate(date)}</T11>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globeIcon: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 6,
    color: 'grey'
  }
})
