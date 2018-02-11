import React, { Component } from "react";
import { StyleSheet,Image,View , Text, TouchableHighlight} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, YesNoListItem, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'user-circle-o',   title: 'firstName', prop: 'firstName'},
  { icon: 'user-circle',   title: 'lastName', prop: 'lastName'},
  { icon: 'envelope-o',   title: 'email', prop: 'email', keyboardType: 'email-address'},
  // { icon: 'phone',   title: 'phone', prop: 'phone', keyboardType: 'phone-pad'}
]

const yesNoItems = [
  {prop: 'showPersonalInfo',  icon: 'unlock', title:'showPersonalInfo'}
]

class EditProfileInformation extends Component {

  constructor(props) {
      super(props)
      this.state = { }
 }

 componentDidMount(){
   debugger;
   var newState = this.props.profileInfo || {}
   newState.hidePrivacityOption = this.props.navigation.state.params && this.props.navigation.state.params.hidePrivacityOption
   this.setState( newState );
 }

 onAccept = () =>  this.props.register(this.state, () =>  this.props.navigation.goBack())


 setVal = (prop, val, valId) => {
   this.setState((prevState) => {
      prevState[prop] = val

      if(valId){
        prevState[prop + 'Id'] = valId
      }

      return prevState
   })
 }

  render() {
   debugger;
    const {navigation } = this.props
    var state = this.state;

    return (
      <StackView navigation={navigation}  title={I18n.t('profile.titles.editPersonalInfo')}  onAccept={this.onAccept}>
          <View >
             {
              items.map( ({icon, title, prop, keyboardType}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={I18n.t(['profile','information', title])}
                 value={ state[prop] }
                 onChangeText={(text) => this.setVal(prop, text)}
                 keyboardType={keyboardType}
                 />) )
            }

            <ListItem
              navigation={navigation}
              key={101}
              icon={'map-marker'}
              label={I18n.t('profile.location.title')}
              value={ (state.location && state.location.locationName )}
              routeName={'LocationPicker'}
              params={{setVal: this.setVal, data: state.location}}/>

             {!state.hidePrivacityOption &&
              yesNoItems.map( ({icon, title, prop}, i) => (
                <YesNoListItem
                   key={i}
                   icon={icon}
                   label={I18n.t(['profile','information' , title])}
                   value={ state[prop] }
                   handler={ val => this.setVal( prop, val ) }
                   />) )
              }
         </View>
        </StackView>
    );
  }
}

const mapStateToProps = ({ globalReducer}) => ({profileInfo: globalReducer.profileInfo})


export default connect(mapStateToProps, authActions)(EditProfileInformation);
