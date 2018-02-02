/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {Row, Column, T12 } from 'src/components/'
import Icon from 'react-native-fa-icons';



 export default class InputListItem extends Component {

  render() {
    var {icon, label, value, secureTextEntry, onChangeText, invalid, keyboardType} = this.props;

    return (
       <View>
         <Row h={60}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column  h={60}  columns={7}  >
             <Icon name={icon} style={styles.icon}/>
           </Column>
           <Column h={60}  columns={7} colspan={6} style={{alignItems:'flex-start'}}>
             <T12 light red={invalid}>{label}</T12>
             <TextInput underlineColorAndroid='transparent' style={styles.input}
               defaultValue={value}
               secureTextEntry={secureTextEntry}
               onChangeText={(text) => onChangeText(text)}
               keyboardType={keyboardType || 'default'}
              />
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
