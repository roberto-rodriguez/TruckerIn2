

import React, { Component } from 'react'

import { StyleSheet, View, TouchableHighlight } from 'react-native';
import {AgentImg, Row, Column, T14} from 'src/components/'
import theme from 'src/theme/variables/platform';

export default class AgentMsg  extends Component {
  render() {
    var {onPress, h, text, error} = this.props

    h = h || 90

    var child = text ? (<T14>{text}</T14>) : this.props.children

    var errorStyle = {}
    if(error){
    //  errorStyle.backgroundColor = '#ff6666'
    }


      return (
        <TouchableHighlight onPress={onPress}  underlayColor={'transparent'} style={[styles.header, errorStyle]}>
          <View>
            <Row h={h}>
              <Column h={h} columns={4} colspan={1} >
                <AgentImg size={58}/>
              </Column>
              <Column h={h} columns={4} colspan={3} >
                {child}
              </Column>
            </Row>
          </View>
        </TouchableHighlight>
      );
  }
}

const styles = StyleSheet.create({
    header:{
      backgroundColor:'#e6ffe6',
      borderColor: theme.primaryColor,
      borderWidth: 0.3
    }
  })
