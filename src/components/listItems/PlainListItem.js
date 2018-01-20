/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import {Row, Column, T14 } from 'src/components/'

 export default class PlainListItem extends Component {

  render() {
    var {label, value, navigation, params, style} = this.props;

    const action = () => {
          params &&  params.callback && params.callback( value, label );
           navigation.goBack();
        }

    return (
      <TouchableHighlight  underlayColor={'transparent'}  onPress={action}>
       <View>
         <Row h={60}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column start h={60} >
             <T14 style={style}>{label}</T14>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    ) 
  }
}
