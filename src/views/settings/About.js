import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';

import {StackView,  T11, AgentImg, RowColumn, SimpleListItem} from 'src/components/'

const items = [
  { icon: 'balance-scale',   title: 'Terms of Service', routeName: 'TOS'},
  { icon: 'envelope-o',   title: 'Contact Us', routeName: 'ContactUs'}
]

class About extends Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView navigation={navigation} title={'About TruckerIn'}>
        <AgentImg text={'TruckerIn is the fastest growing network of Truck Drivers, Brockers and Truck Related companies.'}/>
        <View style={{marginTop: 30}}>
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
            <RowColumn style={{margin: 30}}>
             <T11>Version 0.1</T11>
            </RowColumn>
        </View>
      </StackView>

    )
  }

}

export default About;
