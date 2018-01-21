import React, { Component } from "react";
import { View, TextInput} from 'react-native';
import { SimpleListItem, RowColumn, Column, Row, T14, T15, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'key',   title: 'requestAcess' },
  { icon: 'phone',   title: 'support' }
]

class ValidatePhone extends Component {


  render() {
    var state = this.state;
    var {data, valid, setVal} = this.props

    var errorStyle = valid ? {} : {borderColor: 'red', color: 'red'}

    return (
         <View style={{marginTop: 10}}>
            <RowColumn h={30}>
              <T15 green>{'Enter Access Code here'}</T15>
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
                    <T14>{I18n.t('signup.validatePhone.didntReceive')}</T14>
                  </RowColumn>
                  {
                   items.map( ({icon, title, prop}, i) => (
                     <SimpleListItem
                        borderTop={i === 0}
                        key={i}
                        icon={icon}
                        label={I18n.t(['signup', 'validatePhone', title])}
                        onPress={() => {}}
                        />) )
                   }
                </View>
              )
            }

         </View>
    )
  }
}

export default connect(mapStateToProps )(ValidatePhone);
