import React, { Component } from "react";
import { StyleSheet, View} from 'react-native';
import {StackView, YesNoListItem, AgentImg } from 'src/components/'
import * as globalActions from "src/boot/reducers/global.actions"
import { connect } from "react-redux"
import I18n from 'react-native-i18n'

class Settings extends Component {

  setLang = (val) => this.props.setLang(val === 1 ? 'en' : 'es')

  render() {
    const {navigation, lang} = this.props
    return (
      <StackView navigation={navigation} title={I18n.t('settings.title')}>

      <YesNoListItem
         key={1}
         icon={'language'}
         label={I18n.t('settings.lang')}
         value={lang && lang === 'es' ? 2 : 1}
         leftText={'ENG'}
         rightText={'ESP'}
         handler={ (val) => this.setLang(val)}
         />
       <YesNoListItem
          key={2}
          icon={'flag-o'}
          label={I18n.t('settings.receiveNotif')}
          value={true}
          handler={ (val) => alert(val)}
          />
        <YesNoListItem
           key={3}
           icon={'unlock-alt'}
           label={I18n.t('settings.showContactInfo')}
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
