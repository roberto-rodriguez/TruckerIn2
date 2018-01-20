import React, { Component } from "react";
import { View } from "react-native";
import { Container } from "native-base";
import {  Feed, ContactListItem } from "src/components/";

import { connect } from "react-redux";
import * as contactActions from "../reducer/contactActions";

class Community extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <ContactListItem navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate}/>
  )

  loadItems = (page, callback) => this.props.searchContacts(page, null, callback, null)


  render = () => (
      <Container white>
        <View style={{minHeight:'100%'}}>
          {
            <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={this.props.navigation}/>
          }
        </View>
      </Container>
    )
}

  export default connect(null, contactActions)(Community);
