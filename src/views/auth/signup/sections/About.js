import React, { Component } from "react";
import { View } from 'react-native';
import { AgentMsg, CustomButton, LinkButton, LongInputListItem} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

export default class About extends Component {

  t = key => I18n.t(['signup', 'about', key])

  render() {
    var {t} = this
    var {setVal, data} = this.props

    return (
          <View>
              <AgentMsg text={I18n.t(['signup', 'about', (data.roleId === roles.BROKER ? 'descBroker' : 'descCompany')])}/>

              <LongInputListItem icon='quote-left'
                label={ I18n.t( 'general.typeHere' ) }
                value={data['about']}
                onChangeText={(text) => setVal('about', text)}/>
         </View>
    )
  }
}
 
