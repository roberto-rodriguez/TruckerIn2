import React, { Component } from "react";
import { View } from 'react-native';
import { RowColumn, T14, T16, mapStateToProps} from 'src/components/'
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
              <RowColumn h={70}>
                <T16 green>{ t('enjoy') } <T16 green strong>TrckerIn</T16> <T16 red strong> {t('free')} </T16>{t('forOneYear')}</T16>
              </RowColumn>
            <RowColumn h={80} style={{marginHorizontal: 30}}>
                <T14 light>{t('afterThat')}</T14>
              </RowColumn>
         </View>
    )
  }
}

export default connect( mapStateToProps )(AcceptTerms);
