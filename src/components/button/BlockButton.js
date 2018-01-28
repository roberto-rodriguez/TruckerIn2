
import React, { Component } from 'react';
import {StyleSheet, Text} from 'react-native';
import {RowColumn} from 'src/components/'
import { Button} from "native-base";
import I18n from 'react-native-i18n'

 export default class BlockButton extends Component {

  render() {
    var { show = true, text, onPress, disabled} = this.props;


    if(show){
      return (
        <RowColumn h={60}>
               <Button block rounded onPress={ disabled ? null : onPress} style={disabled ? {backgroundColor:'#8CEDBC'} : null} >
                   <Text style={styles.text}>{text || I18n.t('cmp.accept')}</Text>
               </Button>
           </RowColumn>
      )
    }else{
      return null
    }
  }
}


const styles = StyleSheet.create({
  text: {color:'white'}
})
