/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet,Text} from 'react-native';
import {Row, Column,T11,T13,T14, nav } from 'src/components/'
import Icon from 'react-native-fa-icons';
import { NavigationActions } from "react-navigation";



 export default class SimpleListItem extends Component {

  render() {
    var {icon, label, navigation, style, borderTop, onPress, routeName, params} = this.props;

    var borderStyle = {borderBottomWidth:0.3, borderColor: global.secondaryColor}

    if(borderTop){
      borderStyle['borderTopWidth'] = 0.3
    }

    var action = onPress ? onPress : () => nav(navigation, routeName , params)

    return (
      <TouchableHighlight  underlayColor={'transparent'}  onPress={action}>
       <View>
         <Row h={60}  style={borderStyle}>
           <Column  h={60}  columns={7}  >
             <Icon name={icon} style={styles.icon}/>
           </Column>
           <Column h={60}  columns={7} colspan={5} style={{alignItems:'flex-start'}}>
             <T14 style={style}>{label}</T14>
           </Column>
           <Column  h={60}  columns={7}  >
             <Icon name={'angle-right'}  style={styles.icon}/>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    icon: {   fontSize: 18 }
  })
