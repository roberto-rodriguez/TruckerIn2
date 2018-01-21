import React, { Component } from "react";
import { View } from 'react-native';
import { RowColumn, CustomButton, LinkButton, Row, T13, T15, LongInputListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

class About extends Component {

  t = key => I18n.t(['signup', 'about', key])

  render() {
    var {t} = this
    var {setVal, data} = this.props

    return (
          <View>
              <RowColumn h={90}>
                <T15 green>{t( data.roleId === roles.BROKER ? 'descBroker' : 'descCompany')}</T15>
              </RowColumn>

              <LongInputListItem icon='quote-left'
                label={ I18n.t( 'general.typeHere' ) }
                value={data['about']}
                onChangeText={(text) => setVal('about', text)}/>
         </View>
    )
  }
}

export default connect(mapStateToProps )(About);
