import React, { Component } from "react";
import { View , Text } from 'react-native';
import {  Select, InputListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import * as roles from 'src/components/c/Role'
import I18n from 'react-native-i18n'


const items = [
  // { icon: 'user-circle-o',   title: 'First Name', prop: 'firstName'},
  // { icon: 'user-circle',   title: 'Last Name', prop: 'lastName'},
  { icon: 'user-o',  prop: 'username'},
  { icon: 'lock', prop: 'password'}
]


class Information extends Component {

  constructor(props) {
      super(props)
      this.state = { }
 }

 componentDidMount(){
     this.setState(this.props.data)
 }

 setVal = (prop, val, valId) => {
   this.setState((prevState) => {
        prevState[prop] = val

        if(valId){ prevState[prop + 'Id'] = valId }

        return prevState
     })

     this.props.setVal(prop, val, valId)
 }

 showSelect(prop) {
   this[prop + 'Select'].show();
 }

 t = key => I18n.t(['profile', 'information', key])

  render() {
    const { navigation, invalidFields} = this.props
    var t = this.t
    var data  = this.state;
    var isCompany =  data.roleId === roles.COMPANY

    return (
          <View >
            <InputListItem
               icon={isCompany ? 'bank' : 'user-circle-o' }
               label={ t(isCompany ? 'companyName' : 'firstName') }
               value={ data['firstName'] }
               invalid={ invalidFields.indexOf('firstName') >= 0}
               onChangeText={(text) => this.setVal('firstName', text)}
               />

             {
               !isCompany && (
                 <InputListItem
                    icon={'user-circle'}
                    label={ t('lastName') }
                    value={ data['lastName'] }
                    invalid={ invalidFields.indexOf('lastName') >= 0}
                    onChangeText={(text) => this.setVal('lastName', text)}
                    />
               )
             }
             {
              items.map( ({icon, prop}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={ t( prop ) }
                 value={ data[prop] }
                 invalid={ invalidFields.indexOf(prop) >= 0}
                 onChangeText={(text) => this.setVal(prop, text)}
                 secureTextEntry={ prop === "password" ? true : false}
                 />) )
            }
         </View>
    );
  }
}

export default connect( mapStateToProps )(Information);
