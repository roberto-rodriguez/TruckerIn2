import React, { Component } from "react";
import { View, TextInput} from 'react-native';
import { SimpleListItem, RowColumn, Column, Row, T14, T15, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as authActions from "src/views/auth/auth.actions";

const items = [
  { icon: 'key',   title: 'requestAcess' },
  { icon: 'headphones',   title: 'support', routeName: 'ContactUs' }
]

class ValidatePhone extends Component {

 t = (key) => I18n.t(['signup', 'validatePhone', key])

 resendAccessCode = () => this.props.sendAccessCode(this.props.data.phone)

  render() {
    var t = this.t
    var {data, valid, setVal, navigation} = this.props

    var errorStyle = valid ? {} : {borderColor: 'red', color: 'red'}

    return (
         <View style={{marginTop: 10}}>
            <RowColumn h={30}>
              <T15 green>{ t('enterAccessCode') }</T15>
            </RowColumn>
            <RowColumn h={70}>
                <TextInput underlineColorAndroid='transparent'
                  style={[styles.accessCode, errorStyle]}
                  defaultValue={data['accessCode']}
                  onChangeText={(text) => setVal('accessCode', text)} />
            </RowColumn>
            {
              !valid && (
                <View>
                  <RowColumn h={30}>
                    <T14>{ t('didntReceive') }</T14>
                  </RowColumn>
                  {
                   items.map( ({icon, title, prop, routeName, onPress}, i) => (
                     <SimpleListItem
                        borderTop={i === 0}
                        key={i}
                        icon={icon}
                        label={ t(title) }
                        routeName={routeName}
                        navigation={navigation}
                        onPress={routeName ? null : this.resendAccessCode}
                        />) )
                   }
                </View>
              )
            }

         </View>
    )
  }
}

export default connect(mapStateToProps, authActions)(ValidatePhone);
