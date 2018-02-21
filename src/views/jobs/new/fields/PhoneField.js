/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View,  TextInput} from 'react-native';
import {RowColumn, Row, Column, T12, CustomButton } from 'src/components/'
import Icon from 'react-native-fa-icons';
import Prompt from 'react-native-prompt';
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

 class PhoneField extends Component {

   constructor(props) {
     super(props);
     this.state = {
        promptVisible: false,
        phoneOption: props.data && props.data.phoneOption,
        phone: props.data && props.data.phone
      }
   }

  t = (key) => I18n.t(['jobs', 'new', 'phoneField', key])

  render() {
    var {t, state, props} = this
    var { label,  myPhone } = props;
    var { promptVisible, phoneOption, phone} = state

    var buttons = [
      {text: t('noCalls'), radius: 'left'},
      {text:(myPhone || '-'), radius: false},
      {text: t('otherNumber'), radius: 'right'}
     ];

    return (
       <View  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
         <RowColumn  h={25}>
           <T12 light >{t('bestPhone') + (phone ? ': ' + phone : '') }</T12>
         </RowColumn>
         <Row h={45}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           {
             buttons.map((item, i) => (
               <Column  h={45} columns={3} key={i} >
                  <CustomButton
                    radius={item.radius}
                    white={i != phoneOption}
                    text={item.text}
                    handler={()=> this.handler(i)}
                    style={{width:'99%'}}/>
               </Column>
             ))
           }

         </Row>

         <Prompt
              title={t('enterPhone')}
              defaultValue=""
              visible={ promptVisible }
              onCancel={ () => this.setState({
                promptVisible: false
              }) }
              onSubmit={ (phone) => this.onPhoneOptionChange( 2, phone )}/>
       </View>
    );
  }

  handler = (phoneOption) => {
    var phone;

    switch(phoneOption){
      case 0:
        phone = '';
        break;
      case 1:
        phone = this.props.myPhone;
        break;
      case 2:
        this.setState({promptVisible: true})
        return;
    }

    this.onPhoneOptionChange( phoneOption, phone )
  }

  onPhoneOptionChange = (phoneOption, phone) => {
    this.setState({phoneOption, phone, promptVisible: false})

    this.props.onPhoneOptionChange(phoneOption, phone)
  }
}


  const mapStateToProps = ({globalReducer}) => ({
    myPhone: globalReducer.profileInfo.phone
  });

  export default connect(mapStateToProps)(PhoneField);
