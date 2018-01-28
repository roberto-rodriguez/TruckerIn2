import React, { Component } from "react";
import { View } from "react-native";
import { ContactListItem, nav } from "src/components/";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";

import ContactsTabBar from "./ContactsTabBar";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderBtn from 'src/components/header/buttons/HeaderBtn'
import MainHeader from 'src/components/header/MainHeader'

import Messages from 'src/views/msg/Conversations'
import MyContacts from 'src/views/contacts/myContacts/MyContacts'
import Community from 'src/views/contacts/community/Community'


class Contacts extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <ContactListItem navigation={navigation}  key={i} data={data}/>
  )

  loadItems = (page, callback) => {
    this.props.loadContacts(null, page, null, callback, null)
  }


  render() {
    const navigation = this.props.navigation;

    var dataFriendsTraveling = []

    return (
      <View style={{minHeight:'100%'}}>
          <MainHeader navigation={navigation}
            title={I18n.t('contacts.title')}
            right={<HeaderBtn icon='search' handler={() => nav(navigation, 'SearchContacts')} style={{paddingLeft:10}}/>}
           />
           <ScrollableTabView
             style={{paddingTop: 30}}
             renderTabBar={()=><ContactsTabBar/>}
             tabBarPosition='overlayTop'
             >
               <MyContacts tabLabel={I18n.t('contacts.myContacts')}  navigation={navigation}/>
               <Community tabLabel={I18n.t('contacts.allUsers')}  navigation={navigation}/>
               <Messages  tabLabel={I18n.t('contacts.msg')} navigation={navigation}/>
           </ScrollableTabView>
      </View>
    )
  }
}


  export default connect(null, contactActions)(Contacts);
