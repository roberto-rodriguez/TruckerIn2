import React, { Component } from "react";
import { StyleSheet,Image,View , Text, TouchableHighlight} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, YesNoListItem, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'user-circle-o',   title: 'firstName', prop: 'firstName'},
  { icon: 'user-circle',   title: 'lastName', prop: 'lastName'},
  { icon: 'envelope-o',   title: 'email', prop: 'email'},
  { icon: 'phone',   title: 'phone', prop: 'phone'},
//  { icon: 'map-marker',   title: 'location', route:'LocationPicker', prop:'location'}
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

 showSelect( ) {
   this['statusSelect'].show();
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

    const {navigation, statusOptions, isDriver} = this.props
    var state = this.state;

    return (
      <StackView navigation={navigation}  title={I18n.t('profile.titles.editPersonalInfo')}  onAccept={this.onAccept}>
          <View >
             {
              items.map( ({icon, title, prop}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={I18n.t(['profile','information', title])}
                 value={ state[prop] }
                 onChangeText={(text) => this.setVal(prop, text)}
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

            <ListItem
               key={100}
               navigation={navigation}
               icon={'hourglass-end'}
               label={I18n.t(['profile', 'information',  isDriver ? 'jobStatus' : 'hiringStatus' ]) + ':'}
               value={ state[ 'jobStatus' ]}
               handler={ () => this.showSelect( ) }
               />

               <Select
                  ref={o => this.statusSelect = o}
                  options={statusOptions}
                  onPress={(i) => this.setVal( 'jobStatus', statusOptions[i].name, statusOptions[i].id)}
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

const mapStateToProps = ({ globalReducer}) => {
  var isDriver = globalReducer.profileInfo.roleId === 1
  var {jobStatusOptions, hiringStatusOptions} = globalReducer.config

  return {
    isDriver,
    statusOptions: isDriver ? jobStatusOptions : hiringStatusOptions,
    profileInfo: globalReducer.profileInfo
  }
}


export default connect(mapStateToProps, profileActions)(EditProfileInformation);
