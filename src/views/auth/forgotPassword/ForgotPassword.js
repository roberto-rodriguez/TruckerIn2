import React, { Component } from "react";
import {StackView, AgentImg, SimpleListItem, nav} from 'src/components/'
import I18n from 'react-native-i18n'

const items = [ { icon: 'envelope-o' , routeName: 'ContactUs'} ]

export default class ForgotPassword extends Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={I18n.t('forgotPassword.title')}  onAccept={this.onAccept}>
        <AgentImg text={I18n.t('forgotPassword.text')}/>

        {
         items.map( ({icon, routeName}, i) => (
           <SimpleListItem
              navigation={navigation}
              borderTop={i === 0}
              key={i}
              icon={icon}
              label={I18n.t('forgotPassword.contactUs')}
              routeName={routeName}
              />) )
         }
      </StackView>
    )
  }

}
