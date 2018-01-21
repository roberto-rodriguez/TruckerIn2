/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import {Row, Column, T12, CustomButton } from 'src/components/'
import Icon from 'react-native-fa-icons';

 export default class YesNoListItem extends Component {

  render() {
    var {icon, label, value, handler, leftText, rightText, invalid} = this.props;

    return (
       <View>
         <Row h={60}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column  h={60}  columns={8}  >
             <Icon name={icon} style={styles.icon}/>
           </Column>
           <Column h={60}  columns={8} colspan={3} style={{alignItems:'flex-start'}}>
             <T12 light red={invalid}>{label}</T12>
           </Column>
           <Column  h={60}  columns={8}  colspan={2} end>
              <CustomButton radius={'left'} white={value != 1} text={leftText || 'YES'} handler={()=>handler(1)}/>
           </Column>
           <Column  h={60} columns={8} colspan={2} start>
              <CustomButton radius={'right'} white={value != 2} text={rightText || 'NO'} handler={()=>handler(2)}/>
           </Column>
         </Row>
       </View>
    );
  }
}



const styles = StyleSheet.create({
    icon: { fontSize: 18 }
  })
