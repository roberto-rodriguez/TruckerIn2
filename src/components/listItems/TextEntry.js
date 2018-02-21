/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {Row, Column,T10, T13, T14 } from 'src/components/'
import Icon from 'react-native-fa-icons';


 export default class TextEntry extends Component {

   state = {text: null}

   onChangeText = (text) => {
     this.setState({text})
     this.props.onChangeText( text )
   }

  render() {
    var {label,  invalid, numberOfLines, limit, defaultValue} = this.props;
    var {text} = this.state
    return (
       <View>
         {label && (
           <Row h={20} style={{paddingTop: 10}}>
             <Column h={20} columns={2} start>
               <T13 red={invalid && !text}>{label}</T13>
             </Column>
             {limit &&
               (<Column h={20} columns={2} end>
                 <T10 light red={invalid && !text}>0 / 140</T10>
                </Column>)
             }
           </Row>
         )}

         <View  style={{padding: 15}}>
           <TextInput
             underlineColorAndroid='transparent'
             multiline={true}
             numberOfLines={numberOfLines || 4}
             style={styles.text}
             defaultValue={defaultValue}
             onChangeText={(text) => this.onChangeText(text)}
            />
         </View>
       </View>
    );
  }
}


const styles = StyleSheet.create({
    icon: { fontSize: 18 },
    text:{borderWidth:0.3, borderColor: global.secondaryColor, width:'100%', textAlignVertical: 'top', borderRadius: 10}
  })
