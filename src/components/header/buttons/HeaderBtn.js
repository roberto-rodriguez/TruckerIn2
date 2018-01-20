/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button } from "native-base";
import {View, Text} from 'react-native'
import Icon from 'react-native-fa-icons';
import styles from '../styles'

class HeaderBtn extends Component {
  render(){
    var {icon, disabled, handler, style, badge} = this.props;

    var disabledStyle = disabled ? {color: global.secondaryColor} : null


    return (
      <Button
        transparent
        style={[styles.rightBtn, style]}
        onPress={handler}
      >
        <Icon name={icon} style={[styles.icon, disabledStyle]}/>
        {badge > 0 &&
        (<View style={styles.IconBadge}>
          <Text  style={[styles.IconBadgeText, {fontSize: (badge > 9 ? 10 : 12), paddingTop:  (badge > 9 ? 2 : 0)}]}>
           {badge}
          </Text>
        </View>)
      }
      </Button>
    )
  }
}

export default HeaderBtn
