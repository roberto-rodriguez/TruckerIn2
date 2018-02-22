/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import {Row, Column, T13, CustomButton } from 'src/components/'
import Icon from 'react-native-fa-icons';
import I18n from 'react-native-i18n'

 export default class OptionsListItem extends Component {

  render() {
    var {icon, label, value, handler, leftText, rightText, invalid, borderTop, strong} = this.props;

    var borderStyle = {borderBottomWidth:0.3, borderColor: global.secondaryColor}

    if(borderTop){
      borderStyle['borderTopWidth'] = 0.3
    }

    return (
       <View>
         <Row h={60}  style={borderStyle}>
           <Column h={60}  columns={8} colspan={2} style={{alignItems:'flex-start'}}>
             <T13 shortLine red={invalid && !value} strong={strong}>{label}</T13>
           </Column>
           <Column  h={60}  columns={8}  colspan={3} end>
              <CustomButton radius={'left'} white={value != 1} text={leftText} handler={()=>handler(1)} style={{width:'99%'}}/>
           </Column>
           <Column  h={60} columns={8} colspan={3} start>
              <CustomButton radius={'right'} white={value != 2} text={rightText} handler={()=>handler(2)} style={{width:'99%'}}/>
           </Column>
         </Row>
       </View>
    );
  }
}



const styles = StyleSheet.create({
    icon: { fontSize: 18 }
  })
