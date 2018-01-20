import React, { Component } from "react";
import {View, ActivityIndicator} from 'react-native'
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";

import { connect } from "react-redux";
import * as globalActions from "src/reducers/globalActions";

import * as screens from './screens'

import SideBar from "src/sidebar/Sidebar";
import MainTabNavigation from './views/MainTabNavigation'


const Drawer = DrawerNavigator(
  {
    MainTabNavigation: { screen: MainTabNavigation }
  },
  {
    initialRouteName: "MainTabNavigation",
    contentComponent: props => <SideBar {...props} />
  }
);

var screenViews = Object.keys(screens).reduce((acc, screenName) => {
                                       acc[screenName] = {screen: screens[screenName]};
                                       return acc;
                                     }, {})

const App = StackNavigator(
  {
    ...screenViews,
     Drawer: { screen: Drawer }
  },
  {
    index: 0,
//    initialRouteName: "Drawer",
    initialRouteName: "Login",
//    initialRouteName: "About",
    headerMode: "none"
  }
);


class RootApp extends Component {

 componentDidMount() {
     this.props.setupLang()
  }

 render(){
   return (
    <Root>
     <App />
     {this.props.isLoading && <ActivityIndicator size="large" color={"#EA0000"} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}/>}
   </Root>
 )
 }
}

  const mapStateToProps = state => ({
    isLoading: state.globalReducer.isLoading
  });
  export default connect(mapStateToProps, globalActions)(RootApp);
