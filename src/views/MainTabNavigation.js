/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-fa-icons';
import TabNavigator from 'react-native-tab-navigator';
import Contacts from 'src/views/contacts/Contacts'
import Jobs from "src/views/jobs/Jobs";
import theme from "src/theme/variables/platform";
import I18n from 'react-native-i18n'



export default class MainTabNavigation extends Component {
  state= {
    selectedTab: 'contacts'
  };



  render() {
    var navigation = this.props.navigation;

    return (
        <TabNavigator style={styles.container} tabBarStyle={{backgroundColor:theme.toolbarBottomBg, height: 45}}>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'jobs'}
              title={I18n.t('general.tabs.jobs')}
              titleStyle={{color:'white'}}
              selectedTitleStyle={styles.selectedText}
              renderIcon={() => <Icon name={"truck"}  style={styles.icon}/>}
              renderSelectedIcon={() => <Icon name={"truck"}  style={styles.icon}/>}
              onPress={() => this.setState({selectedTab: 'jobs'})}>
              <Jobs  navigation={navigation}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'contacts'}
            title={I18n.t('general.tabs.contacts')}
            titleStyle={{color:'white'}}
            selectedTitleStyle={styles.selectedText}
            renderIcon={() => <Icon name={"handshake-o"}  style={styles.icon}/>}
            renderSelectedIcon={() => <Icon name={"handshake-o"}  style={styles.icon}/>}
            onPress={() => this.setState({selectedTab: 'contacts'})}>
            <Contacts navigation={navigation}/>
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon:{
    fontSize:18,
    paddingTop:5,
    margin:0,
    color:'white'
  },
  selectedText:{
    color: "white", borderBottomColor:'white', borderBottomWidth:1
  }
});

/*
<TabNavigator.Item
  selected={this.state.selectedTab === 'chat'}
  title="Book Keeping"
  titleStyle={{color:'white'}}
  selectedTitleStyle={styles.selectedText}
  renderIcon={() => <Icon name={"ios-calculator"}  style={styles.icon}/>}
  renderSelectedIcon={() => <Icon name={"ios-calculator-outline"}  style={styles.icon}/>}
  onPress={() => this.setState({selectedTab: 'chat'})}>
  <BlankPage/>
</TabNavigator.Item>
<TabNavigator.Item
  selected={this.state.selectedTab === 'friends'}
  title="Forum"
  titleStyle={{color:'white'}}
  selectedTitleStyle={styles.selectedText}
  renderIcon={() => <Icon name={"ios-people"} style={styles.icon}/>}
  renderSelectedIcon={() => <Icon name={"ios-people-outline"}  style={styles.icon}/>}
  onPress={() => this.setState({selectedTab: 'friends'})}>
  <BlankPage/>
</TabNavigator.Item>
<TabNavigator.Item
  selected={this.state.selectedTab === 'notifications'}
  title="Market"
  titleStyle={{color:'white'}}
  selectedTitleStyle={styles.selectedText}
  renderIcon={() => <Icon name={"ios-cart"}  style={styles.icon}/>}
  renderSelectedIcon={() => <Icon name={"ios-cart-outline"}  style={styles.icon}/>}
  onPress={() => this.setState({selectedTab: 'notifications'})}>
  <BlankPage/>
</TabNavigator.Item>
*/
