import React, { Component } from "react";
import { View } from "react-native";
import { Container } from "native-base";
import {Feed } from 'src/components/'

import MsgItem from './MsgItem'

import { connect } from "react-redux";
import * as msgActions from 'src/views/msg/msg.actions'

class Conversations extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <MsgItem navigation={navigation} dataRow={data} key={i} shouldUpdate={shouldUpdate} />
  )

  loadItems = (page, callback) => this.props.listConversations(page, callback)


  render = () => (
      <Container>
        <View style={{minHeight:'100%'}}>
            <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={this.props.navigation}/>
        </View>
      </Container>
    )
}

  export default connect(null, msgActions)(Conversations)
