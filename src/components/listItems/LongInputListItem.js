/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {Row, Column,T12 } from 'src/components/'
import Icon from 'react-native-fa-icons';


 export default class LongInputListItem extends Component {

  render() {
    var {icon, label, value, navigation, onChangeText} = this.props;

    return (
       <View>
         <Row h={200}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column  h={50}  columns={7}  >
             <Icon name={icon} style={styles.icon}/>
           </Column>
           <Column h={200}  columns={7} colspan={6} style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
             <T12 light>{label}</T12>
             <TextInput
               underlineColorAndroid='transparent'
               multiline={true}
               numberOfLines={8}
               style={styles.text}
               value={value}
               onChangeText={(text) => onChangeText(text)}
              />
           </Column>
         </Row>
       </View>
    );
  }
}


const styles = StyleSheet.create({
    icon: { fontSize: 18 },
    text:{width:'100%', textAlignVertical: 'top'}
  })
