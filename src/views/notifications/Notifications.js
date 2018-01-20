import React, { Component } from "react";
import { View } from "react-native";
import { Container } from "native-base";
import {Feed, Header} from 'src/components/'

import NotificationItem from './NotificationItem'

import { connect } from "react-redux";
import * as notificationsActions from 'src/views/notifications/notifications.actions'

class Notifications extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <NotificationItem navigation={navigation} data={data} key={i} shouldUpdate={shouldUpdate} />
  )

  loadItems = (page, callback) => this.props.listNotifications(page, callback)


  render = () => (
    <Container>
      <View style={{minHeight:'100%'}}>
          <Header back
           title={'Notifications'}
           navigation={this.props.navigation}
          />
          <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={this.props.navigation}/>
      </View>
    </Container>
    )
}

  export default connect(null, notificationsActions)(Notifications)
