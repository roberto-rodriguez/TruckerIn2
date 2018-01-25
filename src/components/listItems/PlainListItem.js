/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import {Row, Column, T14 } from 'src/components/'

 export default class PlainListItem extends Component {

   shouldComponentUpdate(nextProps, nextState){
     if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
       return true;
     }
      return nextProps.shouldUpdate
   }

  render() {
    var {label, value, navigation, params, style, handler} = this.props;

    const action =  handler ? this.handler : this.defaultHandler

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

  handler = () => {
        var {label, value, handler} = this.props;
        handler(value, label)
  }

  defaultHandler = () => {
        var { params} = this.props;
        params &&  params.callback && params.callback( value, label );
        navigation.goBack();
  }
}
