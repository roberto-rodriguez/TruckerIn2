import React, {Component} from "react";
import { StyleSheet,   Text, View } from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

import SocialTabBar from './SocialTabBar'
import News from 'src/views/social/news/News'
import Friends from 'src/views/social/friends/Friends'
import Messages from 'src/views/social/messages/Chat'
import MyContacts from 'src/views/contacts/myContacts/MyContacts'
import Community from 'src/views/contacts/community/Community'

// page={1}  // initialPage={1}
export default class Social extends Component {

  render() {
    var navigation = this.props.navigation;

    return <ScrollableTabView
      style={styles.container}
      renderTabBar={()=><SocialTabBar/>}
      tabBarPosition='overlayTop'
      >

        <MyContacts tabLabel='My Contacts'  navigation={navigation}/>
        <Community tabLabel='Community'  navigation={navigation}/>
        <Messages  tabLabel='Messages'  navigation={navigation}/>
    </ScrollableTabView>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
});

//<News tabLabel='News' navigation={navigation}/>
