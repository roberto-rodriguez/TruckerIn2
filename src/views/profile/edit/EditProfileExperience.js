import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, Column, TransparentButton, ListItem, Select, YesNoListItem} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

const items = [
  {prop: 'experience',  icon: 'tachometer',   title: 'experience'},
  {prop: 'equipment',  icon: 'truck',   title: 'equipment'}
]

const yesNoItems = [
  {prop: 'ownerOperator',  icon: 'street-view', title:'ownerOperator'},
  {prop: 'overRoadExp',  icon:'road', title:'recentOver'},
  {prop: 'willTakeOverRoad',  icon: 'hand-stop-o', title:'wouldOver'}
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

   this.props.saveProfileExperience(this.state);
   this.props.navigation.goBack();
 }

  render() {
    const {navigation, equipmentOptions, experienceOptions} = this.props
    var state = this.state;

    return (
       <StackView navigation={navigation} title={I18n.t('profile.titles.updateExperience')}  onAccept={this.onAccept}>
          <View >
             {
              items.map( ({icon, title, prop}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={I18n.t(['profile','experience' , title])}
                 value={ state[prop] }
                 handler={ () => this.showSelect( prop ) }
                 />) )
            }

            {
             yesNoItems.map( ({icon, title, prop}, i) => (
               <YesNoListItem
                  key={i}
                  icon={icon}
                  label={I18n.t(['profile','experience' , title])}
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

         </View>

        </StackView>
    );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  profileExperience: globalReducer.profileExperience,
  equipmentOptions: globalReducer.config.equipmentOptions ,
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : I18n.t('profile.experience.moreThan') + exp.name})),
  lang: globalReducer.config.lang
})

export default connect(mapStateToProps, profileActions)(EditProfileExperience);
