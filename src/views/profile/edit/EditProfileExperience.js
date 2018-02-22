import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, TransparentButton, ListItem, Select, OptionsListItem} from 'src/components/'
import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";
import I18n from 'react-native-i18n'

const items = [
  {prop: 'experience',  icon: 'tachometer',   title: 'experience'},
  {prop: 'equipment',  icon: 'truck',   title: 'equipment'}
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
   // if(this.state.equipmentId)completion += 20;
   // if(this.state.experienceId)completion += 20;
   // if(this.state.ownerOperator)completion += 20;
   // if(this.state.overRoadExp)completion += 20;
   // if(this.state.willTakeOverRoad)completion += 20;

   //if(completion > 99)completion = 100;

   this.state.completion = completion

  // this.props.saveProfileExperience(this.state);

   this.props.register(this.state, () =>  this.props.navigation.goBack())

   this.props.navigation.goBack();
 }

 t = (key) => I18n.t(['profile', 'experience',  key])
 j = (key) => I18n.t(['jobs', 'new', key])

  render() {
    const {navigation, equipmentOptions, experienceOptions, distanceOptions, categoryOptions, isDriver} = this.props
    var {t, j, state} = this

    return (
       <StackView navigation={navigation} title={I18n.t('profile.titles.updateExperience')}  onAccept={this.onAccept}>
          <View >
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

            <OptionsListItem
              label={j('category') }
              leftText={j('ownerOperator') }
              rightText={j('companyDriver')}
              value={state.categoryId}
              handler={(val) => this.setVal('category', categoryOptions[val], val)}
            />

            <OptionsListItem
              label={j('distance')}
              leftText={j('regional')}
              rightText={j('onTheRoad')}
              value={state.distanceId}
              handler={(val) => this.setVal('distance', distanceOptions[val], val)}
            />

            <Select
               ref={o => this.equipmentSelect = o}
               options={ equipmentOptions}
               onPress={(id) => this.setVal('equipment', equipmentOptions[id] , id)}
             />
             <Select
                ref={o => this.experienceSelect = o}
                options={ experienceOptions}
                onPress={(id) => this.setVal('experience', experienceOptions[id] , id)}
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
    profileExperience: globalReducer.profileExperience,
    experienceOptions: globalReducer.config.experienceOptionsObj || {},
    equipmentOptions: globalReducer.config.equipmentOptionsObj || {},
    distanceOptions: globalReducer.config.distanceOptionsObj || {},
    categoryOptions: globalReducer.config.categoryOptionsObj || {},
    lang: globalReducer.config.lang
  }
}


export default connect(mapStateToProps, authActions)(EditProfileExperience);
