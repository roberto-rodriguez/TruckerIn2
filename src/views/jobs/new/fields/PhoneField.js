/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {RowColumn, Row, Column, T12, CustomButton } from 'src/components/'
import Icon from 'react-native-fa-icons';



 export default class PhoneField extends Component {

  render() {
    var {icon, label, value, invalid } = this.props;
    value = 1;

    return (
       <View  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
         <RowColumn  h={25}>
           <T12 light red={invalid}>{label}</T12>
         </RowColumn>
         <Row h={45}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column  h={45}  columns={3}  >
              <CustomButton radius={'left'} white={value != 0} text={'No Llamadas'} handler={()=>handler(1)} style={{width:'99%'}}/>
           </Column>
           <Column  h={45}  columns={3}  >
              <CustomButton radius={false} white={value != 1} text={'7864540209'} handler={()=>handler(1)} style={{width:'99%'}}/>
           </Column>
           <Column  h={45} columns={3} >
              <CustomButton radius={'right'} white={value != 2} text={'Otro Number'} handler={()=>handler(2)} style={{width:'99%'}}/>
           </Column>
         </Row>
       </View>
    );
  }
}


const styles = StyleSheet.create({
    icon: {
      fontSize: 18
    },
    input:{
      width:'100%',
      height: 35,
      padding:0
    }
  })
