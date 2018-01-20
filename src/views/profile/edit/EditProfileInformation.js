import React, { Component } from "react";
import { StyleSheet,Image,View , Text, TouchableHighlight} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, YesNoListItem, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "../reducer/profileActions";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'user-circle-o',   title: 'firstName', prop: 'firstName'},
  { icon: 'user-circle',   title: 'lastName', prop: 'lastName'},
  { icon: 'envelope-o',   title: 'email', prop: 'email'},
  { icon: 'phone',   title: 'phone', prop: 'phone'},
  { icon: 'map-marker',   title: 'location', route:'LocationPicker', prop:'location'}
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
   var newState = this.props.profileInfo || {}
   newState.hidePrivacityOption = this.props.navigation.state.params && this.props.navigation.state.params.hidePrivacityOption
   this.setState( newState );
 }

 showSelect(prop) {
   this[prop + 'Select'].show();
 }

 onAccept = () => {
   var info = this.state;
   var completion = 0;
   if(info.firstName)completion += 16.6;
   if(info.lastName)completion += 16.6;
   if(info.email)completion += 16.6;
   if(info.phone)completion += 16.6;
   if(info.locationId)completion += 16.6;
   if(info.jobStatusId)completion += 16.6;

   info.completion = completion < 99 ? completion : 100;

   this.props.saveProfileInfo(info)
   this.props.navigation.goBack();
 }

 setVal(prop, val, valId) {
   this.setState((prevState) => {
      prevState[prop] = val

      if(valId){
        prevState[prop + 'Id'] = valId
      }

      return prevState
   })
 }

  render() {

    const {navigation, jobStatusOptions} = this.props
    var state = this.state;

    return (
      <StackView navigation={navigation}  title={I18n.t('profile.information.title')}  onAccept={this.onAccept}>
          <View >
             {
              items.map( ({icon, title, prop}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={I18n.t(['profile','information' , title])}
                 value={ state[prop] }
                 onChangeText={(text) => this.setVal(prop, text)}
                 />) )
            }

            <ListItem
               key={100}
               navigation={navigation}
               icon={'hourglass-end'}
               label={I18n.t(['profile.information.jobStatus'])}
               value={ state['jobStatus']}
               handler={ () => this.showSelect( 'jobStatus' ) }
               />

            <Select
               ref={o => this.jobStatusSelect = o}
               options={jobStatusOptions}
               onPress={(i) => this.setVal('jobStatus', jobStatusOptions[i].name, jobStatusOptions[i].id)}
             />

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

const mapStateToProps = ({ globalReducer}) => ({
   profileInfo: globalReducer.profileInfo,
   jobStatusOptions: globalReducer.config.jobStatusOptions,
   lang: globalReducer.config.lang
 })

export default connect(mapStateToProps, profileActions)(EditProfileInformation);
