import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';
import {StackView, AgentImg, SimpleListItem, nav} from 'src/components/'
import I18n from 'react-native-i18n'

const items = [ { icon: 'envelope-o',   title: 'Contact Us', routeName: 'ContactUs'} ]

export default class ForgotPassword extends Component {


  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={'Terms of Service'}  onAccept={this.onAccept}>
        <AgentImg text={'Password recovery functionality will be ready in the next version, but for now you can Contact Us and we will help you.'}/>


        {
         items.map( ({icon, title, routeName}, i) => (
           <SimpleListItem
              navigation={navigation}
              borderTop={i === 0}
              key={i}
              icon={icon}
              label={title}
              routeName={routeName}
              />) )
         }
      </StackView>
    )
  }

}

const styles = StyleSheet.create({
  p: {
    marginHorizontal: 15
  },
  h: {
    marginTop: 15,
    fontWeight: "bold",
    marginHorizontal: 15
  }
})
