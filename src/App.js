

import React, { Component } from "react";
import {View, Image, ActivityIndicator} from 'react-native'

import { StackNavigator, DrawerNavigator } from "react-navigation"
import { Root, Container } from "native-base";

import { connect } from "react-redux";
import * as globalActions from "src/boot/reducers/global.actions";
const logo = require("../assets/truckerin.jpg");
import styles from "src/views/auth/login/styles";
import * as screens from './screens'

import SideBar from "src/views/sidebar/Sidebar";
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
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const AppAlreadyLogged = StackNavigator(
  {
    ...screenViews,
     Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


class RootApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          checkedLogin: false,
          isAlreadyLoggedIn: null,
          isAlreadySetup: false
        }
   }

 componentDidMount() {
     this.props.setupLang()
    this.props.setup( (isAlreadyLoggedIn) => this.setState({checkedLogin: true, isAlreadyLoggedIn, isAlreadySetup: true}))
  }

  componentWillReceiveProps(newProps){
    if(!this.state.isAlreadySetup && newProps.headerError){
      this.setState({checkedLogin: true, isAlreadyLoggedIn: false, isAlreadySetup: true})
    }
  }

 render(){
   var {checkedLogin, isAlreadyLoggedIn} = this.state


   return (
    <Root>
      {!this.state.checkedLogin ? (
        <Container white>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
        </View>
        <ActivityIndicator size="large" color={"#EA0000"}/>
       </Container>
      )
      :
      ( isAlreadyLoggedIn ? <AppAlreadyLogged /> : <App/> )
     }
    </Root>
 )
 }
}

const mapStateToProps = ({globalReducer}, ownProps, ownState) => ({ headerError: globalReducer.view.headerError })


export default connect(mapStateToProps, globalActions)(RootApp);
