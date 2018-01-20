import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';
import {StackView, YesNoListItem, AgentImg } from 'src/components/'
import * as globalActions from "src/reducers/globalActions"
import { connect } from "react-redux"

class Settings extends Component {

  setLang = (val) => this.props.setLang(val === 1 ? 'en' : 'es')

  render() {
    const {navigation, lang} = this.props
    return (
      <StackView navigation={navigation} title={'Settings'}>

      <YesNoListItem
         key={1}
         icon={'language'}
         label={'Language'}
         value={lang && lang === 'es' ? 2 : 1}
         leftText={'ENG'}
         rightText={'ESP'}
         handler={ (val) => this.setLang(val)}
         />
       <YesNoListItem
          key={2}
          icon={'flag-o'}
          label={'Receive Notifications'}
          value={true}
          handler={ (val) => alert(val)}
          />
        <YesNoListItem
           key={3}
           icon={'unlock-alt'}
           label={'Show my contact Information'}
           value={true}
           handler={ (val) => alert(val)}
           />
      </StackView>
    )
  }

}

function mapStateToProps({globalReducer}) { 
	return {
    lang: globalReducer.config.lang
  }
}


 export default connect(mapStateToProps, globalActions)(Settings);
