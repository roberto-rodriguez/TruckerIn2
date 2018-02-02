import React, { Component } from "react";
import { View, TextInput,Text} from 'react-native';
import { SimpleListItem, RowColumn, Column, Row, T14, T15, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as authActions from "src/views/auth/auth.actions";
import {codePinStyles} from './pin-code-style';


const items = [
  { icon: 'key',   title: 'requestAcess' },
  { icon: 'headphones',   title: 'support', routeName: 'ContactUs' }
]

class ValidatePhone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      code: new Array(props.number).fill(''),
      edit: 0,
      accessCode: props.accessCode
    };

    this.textInputsRefs = [];

    this.clean = this.clean.bind(this);
    this.focus = this.focus.bind(this);
    this.isFocus = this.isFocus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

 t = (key) => I18n.t(['signup', 'validatePhone', key])

 resendAccessCode = () => this.props.sendAccessCode(this.props.data.phone)

  render() {
    var t = this.t
    var {number,data, valid, setVal, navigation, validForm} = this.props
    var error = !validForm

    pins = [];
    for (let index = 0; index < number; index++) {
      const id = index;
      pins.push(
        <TextInput
          key={id}
          ref={ref => (this.textInputsRefs[id] = ref)}
          onChangeText={text => this.handleEdit(text, id)}
          onFocus={() => this.isFocus(id)}
          value={this.state.code[id] ? this.state.code[id].toString() : ''}
          style={codePinStyles.pin}
          returnKeyType={'done'}
          autoCapitalize={'sentences'}
          autoCorrect={false}
          autoFocus={id === 0 && this.props.autoFocusFirst}
          keyboardType="numeric"
        />
      );
    }


    return (
         <View style={{marginTop: 10}}>

            <View style={ codePinStyles.container }>
              <RowColumn h={40}>
                <T15 red={error}>{t('enterAccessCode')}</T15>
              </RowColumn>

              <View style={ codePinStyles.containerPin }>
                {pins}
              </View>
            </View>

            {
              error && (
                <View>
                  <RowColumn h={65}>
                    <T14 light>{'Asegurese de entrar los 4 dijitos que le enviamos por mensaje de texto, si no lo recibio puede tomar una de estas opciones'}</T14>
                  </RowColumn>
                  <RowColumn h={20}/>
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


  clean() {
    this.setState({
      code: new Array(this.props.number).fill(''),
      edit: 0
    });
    this.focus(0);
  }

  focus(id) {
    this.textInputsRefs[id].focus();
  }

  isFocus(id) {
    let newCode = this.state.code.slice();

    for (let i = 0; i < newCode.length; i++) if (i >= id) newCode[i] = '';

    this.setState({
      code: newCode,
      edit: id
    });
  }

  handleEdit(number, id) {
    let newCode = this.state.code.slice();
    newCode[id] = number;

    // User filling the last pin ?
    if (id === this.props.number - 1) {


      // But it's different than code
      // if (this.state.accessCode !== newCode.join('')) {
      //   this.setState({
      //     error: true,
      //     code: new Array(this.props.number).fill(''),
      //     edit: 0
      //   });
      //   this.focus(0);
      //   return;
      // }

      this.props.validateAccessCode( newCode.join('') );

      return;
    }

    this.focus(this.state.edit + 1);

    this.setState(prevState => {
      return {
        error: false,
        code: newCode,
        edit: prevState.edit + 1
      };
    });
  }

}
/*
<RowColumn h={70}>
    <TextInput underlineColorAndroid='transparent'
      style={[styles.accessCode, errorStyle]}
      defaultValue={data['accessCode']}
      onChangeText={(text) => setVal('accessCode', text)} />
</RowColumn>

*/

export default connect(mapStateToProps, authActions)(ValidatePhone);
