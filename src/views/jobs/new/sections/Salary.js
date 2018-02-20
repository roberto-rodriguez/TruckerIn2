import React, { Component } from "react";
import {  View } from "react-native";

import {TextEntry,  RowColumn, T14} from 'src/components/'
import styles from "../styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";


class Salary extends Component {

  render() {
    const {navigation, data, setVal} = this.props

    return (
      <View>
          <RowColumn h={50}>
            <T14 green>Salary, Payment Scale and Benefits</T14>
          </RowColumn>

          <TextEntry
            defaultValue={data['salary']}
            numberOfLines={16}
            onChangeText={(val) => setVal('salary', val)}
          />
      </View>
    );
  }
}


export default connect( )(Salary);
