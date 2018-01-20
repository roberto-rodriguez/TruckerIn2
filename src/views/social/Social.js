import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native'
import ProfileBtn from 'src/components/header/buttons/ProfileBtn'
import { NavigationActions } from "react-navigation";

import { StackNavigator } from 'react-navigation'
import SocialTabNavigator from "./tabNavigator/SocialTabNavigator";
import CustomHeader from 'src/components/header/CustomHeader'
import HeaderBtn from 'src/components/header/buttons/HeaderBtn'

const openSearchNavigateAction = () =>
  NavigationActions.navigate({
    routeName: "Search",
    params: { title: 'Search Contacts', searchUser: true }
  });

export default class Social extends Component {

 render(){
   var {navigation} = this.props;

   return (<View style={{minHeight:'100%'}}>
   <CustomHeader navigation={navigation}
     title={'Contactos'}
     toLeft={<ProfileBtn navigation={navigation}/> }
     toRight={<HeaderBtn icon='bell' disabled handler={() => navigation.navigate('Notifications')}/>}
     right={<HeaderBtn icon='search' handler={() => navigation.dispatch(openSearchNavigateAction( ))} style={{paddingLeft:10}}/>}
    />

            <SocialTabNavigator navigation={navigation}/>
           </View>)
 }

}
