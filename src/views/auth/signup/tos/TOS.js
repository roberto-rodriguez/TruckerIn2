import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';
import {StackView, Row,  Column, T12, T13, T14} from 'src/components/'
import I18n from 'react-native-i18n'
import tos from './es'

class TOS extends Component {


  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={'Terms of Service'}  onAccept={this.onAccept}>
        <Row><Column>
          <T12 light>{I18n.t(['tos', 'lastUpdated'])}</T12>
        </Column></Row>

          {Object.keys(tos).map( (row, i) => (
                    <View key={i}>
                      <T13 style={styles.h}>
                       {I18n.t(['tos', row, 'title'])}
                      </T13>
                      <T13 style={styles.p}>
                        {I18n.t(['tos', row, 'text'])}
                      </T13>
                    </View>
                  ) )}

        <T13 style={{marginBottom: 20}}></T13>

      </StackView>
    )
  }

}

const styles = StyleSheet.create({
  p: {
    marginHorizontal: 15
  },
  h: {
    marginTop: 15,
    fontWeight: "bold",
    marginHorizontal: 15
  }
})

export default TOS;
