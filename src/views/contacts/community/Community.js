import React, { Component } from "react";
import { View } from "react-native"; 
import {  Feed, ContactListItem } from "src/components/";

import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";

class Community extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <ContactListItem navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate}/>
  )

  loadItems = (page, callback) => this.props.listNonRelatedUsers(page, callback)


  render = () => (
      <View style={{minHeight:'100%', paddingBottom: 50}}>
         <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={this.props.navigation}/>
      </View>
    )
}

  export default connect(null, contactActions)(Community);
