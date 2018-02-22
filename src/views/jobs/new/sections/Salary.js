import React, { Component } from "react";
import {  View, StyleSheet, TextInput } from "react-native";
import {TextEntry,  RowColumn, T14} from 'src/components/'
import I18n from 'react-native-i18n'


export default class Salary extends Component {

  render() {
    const {navigation, data, setVal, invalidFields} = this.props

    return (
      <View style={{paddingHorizontal: 15}}>
          <RowColumn h={50}>
            <T14 green red={invalidFields && invalidFields.indexOf('salary') >= 0}>{I18n.t('jobs.new.salary')}</T14>
          </RowColumn>

          <TextInput
            underlineColorAndroid='transparent'
            multiline={true}
            numberOfLines={16}
            style={styles.text}
            defaultValue={data['salary']}
            onChangeText={(val) => setVal('salary', val)}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text:{
      borderWidth:0.3,
      width:'100%',
      textAlignVertical: 'top',
      borderRadius: 10
    }
  })
