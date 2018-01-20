import React, { Component } from "react";
import { View, TextInput} from 'react-native';
import { SimpleListItem, RowColumn, Column, Row, T15, mapStateToProps} from 'src/components/'
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

    return (
            <View style={{marginTop: 20}}>
            <RowColumn h={70}>
                <TextInput underlineColorAndroid='transparent' style={styles.accessCode}
                  onChangeText={() => {}} />
            </RowColumn>
            <RowColumn h={50}>
              <T15 green>{I18n.t('signup.validatePhone.didntReceive')}</T15>
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
}

export default connect(mapStateToProps )(ValidatePhone);
