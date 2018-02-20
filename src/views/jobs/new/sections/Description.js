import React, { Component } from "react";
import {  View } from "react-native";

import {RowColumn, TextEntry, T14} from 'src/components/'
import styles from "../styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";


class Description extends Component {

  render() {
    const {navigation, data, setVal} = this.props

    return (
      <View>
          <RowColumn h={50}>
            <T14 green>Job Description</T14>
          </RowColumn>

          <TextEntry
            defaultValue={data['description']}
            numberOfLines={16}
            onChangeText={(val) => setVal('description', val)}
          />
      </View>
    );
  }

}


export default connect( )(Description);
