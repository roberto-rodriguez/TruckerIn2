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


  constructor(props) {
    super(props);
    this.state = {
       text: props.defaultValue || ''
     }
  }


   onChangeText = (text) => {
     if(this.props.limit && (text.length > this.props.limit)){
       return;
     }

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
                 <T10 light red={text.length >= limit}>{text.length + ' / ' + limit}</T10>
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
             value={this.state.text}
             onChangeText={(text) => this.onChangeText(text)}
            />
         </View>
       </View>
    );
  }
}


const styles = StyleSheet.create({ 
    text:{borderWidth:0.3, borderColor: global.secondaryColor, width:'100%', textAlignVertical: 'top', borderRadius: 10}
  })
