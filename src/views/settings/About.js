import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';
import I18n from 'react-native-i18n'
import {StackView,  T11, AgentImg, RowColumn, SimpleListItem} from 'src/components/'

const items = [
  { icon: 'balance-scale',   title: 'tos', routeName: 'TOS'},
  { icon: 'envelope-o',   title: 'contact', routeName: 'ContactUs'}
]

class About extends Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={I18n.t('settings.about.title')}>
        <AgentImg text={I18n.t('settings.about.about')}/>
        <View style={{marginTop: 30}}>
            {
             items.map( ({icon, title, routeName}, i) => (
               <SimpleListItem
                  navigation={navigation}
                  borderTop={i === 0}
                  key={i}
                  icon={icon}
                  label={I18n.t(['settings', 'about', title])}
                  routeName={routeName}
                  />) )
             }
            <RowColumn style={{margin: 30}}>
             <T11>Version 0.1</T11>
            </RowColumn>
        </View>
      </StackView>

    )
  }

}

export default About;
