import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, TransparentButton, ListItem, Select, YesNoListItem} from 'src/components/'
import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";
import I18n from 'react-native-i18n'

const items = [
  {prop: 'experience',  icon: 'tachometer',   title: 'experience'},
  {prop: 'equipment',  icon: 'truck',   title: 'equipment'}
]

const yesNoItems = [
  {prop: 'ownerOperator',  icon: 'street-view', title:'ownerOperator'}
]

class EditProfileExperience extends Component {

  constructor(props) {
      super(props)
      this.state = {}
 }

 componentDidMount(){
   this.setState(this.props.profileExperience || {});
 }

 showSelect(prop) {
  this[prop + 'Select'].show();
 }


 setVal(prop, val, valId) {

   if(!val)return;

   this.setState((prevState) => {
     prevState[prop] = val

     if(valId){
       prevState[prop + 'Id'] = valId
     }

     return prevState
   })
 }

 onAccept = () => {
   var completion = 0;
   if(this.state.equipmentId)completion += 20;
   if(this.state.experienceId)completion += 20;
   if(this.state.ownerOperator)completion += 20;
   if(this.state.overRoadExp)completion += 20;
   if(this.state.willTakeOverRoad)completion += 20;

   //if(completion > 99)completion = 100;

   this.state.completion = completion

  // this.props.saveProfileExperience(this.state);

   this.props.register(this.state, () =>  this.props.navigation.goBack())

   this.props.navigation.goBack();
 }

 t = (key) => I18n.t(['profile', 'experience',  key])

  render() {
    const {navigation, equipmentOptions, experienceOptions, statusOptions, isDriver} = this.props
    var {t, state} = this

    return (
       <StackView navigation={navigation} title={I18n.t('profile.titles.updateExperience')}  onAccept={this.onAccept}>
          <View >
            <ListItem
               key={100}
               navigation={navigation}
               icon={'hourglass-end'}
               label={ t( isDriver ? 'jobStatus' : 'hiringStatus') }
               value={ state[ 'jobStatus' ]}
               handler={ () => this.showSelect( 'status' ) }
               />

             {
              items.map( ({icon, title, prop}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={ t( title )}
                 value={ state[prop] }
                 handler={ () => this.showSelect( prop ) }
                 />) )
            }

            {
             yesNoItems.map( ({icon, title, prop}, i) => (
               <YesNoListItem
                  key={i}
                  icon={icon}
                  label={ t( title )}
                  value={ state[prop] }
                  handler={ (val) => this.setVal( prop, val ) }
                  />) )
             }
            <Select
               ref={o => this.equipmentSelect = o}
               options={ equipmentOptions}
               onPress={(i) => this.setVal('equipment', equipmentOptions[i].name, equipmentOptions[i].id)}
             />
             <Select
                ref={o => this.experienceSelect = o}
                options={ experienceOptions}
                onPress={(i) => this.setVal('experience', experienceOptions[i].name, experienceOptions[i].id)}
              />
              <Select
                 ref={o => this.statusSelect = o}
                 options={statusOptions}
                 onPress={(i) => this.setVal( 'jobStatus', statusOptions[i].name, statusOptions[i].id)}
               />
         </View>

        </StackView>
    );
  }
}

const mapStateToProps = ({globalReducer}) => {
  var isDriver = globalReducer.profileInfo.roleId === 1
  var {jobStatusOptions, hiringStatusOptions} = globalReducer.config

  return {
    isDriver,
    statusOptions: isDriver ? jobStatusOptions : hiringStatusOptions,
    profileExperience: globalReducer.profileExperience,
    equipmentOptions: globalReducer.config.equipmentOptions ,
    experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : I18n.t('profile.experience.moreThan') + exp.name})),
    lang: globalReducer.config.lang
  }
}


export default connect(mapStateToProps, authActions)(EditProfileExperience);
