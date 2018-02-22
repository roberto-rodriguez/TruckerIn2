import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import {RowColumn, T14} from 'src/components/'

import I18n from 'react-native-i18n'

export default class Description extends Component {

  render() {
    const {navigation, data, setVal, invalidFields} = this.props

    return (
      <View style={{paddingHorizontal: 15}}>
          <RowColumn h={50}>
            <T14 green red={invalidFields && invalidFields.indexOf('description') >= 0}>{I18n.t('jobs.new.description')}</T14>
          </RowColumn>

          <TextInput
            underlineColorAndroid='transparent'
            multiline={true}
            numberOfLines={16}
            style={styles.text}
            defaultValue={data['description']}
            onChangeText={(val) => setVal('description', val)}
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
