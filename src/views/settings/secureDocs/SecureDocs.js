import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';

import {StackView, Row, Header, Column, AgentImg, T13, T14} from 'src/components/'

class SecureDocs extends Component {


  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={'My Secure Documents'}  onAccept={this.onAccept}>
        <AgentImg text={'This functionality will be available soon.'}/>
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

export default SecureDocs;
