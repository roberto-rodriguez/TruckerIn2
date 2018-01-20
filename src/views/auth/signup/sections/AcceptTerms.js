import React, { Component } from "react";
import { View } from 'react-native';
import { Column, Row, T15, T16, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'

class AcceptTerms extends Component {

  t = key => I18n.t(['signup', 'acceptTerms', key])

  render() {
    var t = this.t
    var state = this.state;

    return (
          <View>
              <Row h={70}><Column h={70}>
                <T16 green>{ t('enjoy') } <T16 green strong>TrckerIn</T16> <T16 red strong> {t('free')} </T16>{t('forOneYear')}</T16>
              </Column></Row>
              <Row h={70}><Column h={70}>
                <T15 light>{t('afterThat')}</T15>
                <T15 light>{t('premium')}</T15>
                <T15 light>{''}</T15>
              </Column></Row>
         </View>
    )
  }
}

export default connect( mapStateToProps )(AcceptTerms);
