import React, { Component } from "react";
import { StyleSheet,Image,View , Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, LongInputListItem, InputListItem, HeaderBtn, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

class EditProfileAddExperience extends Component {

  constructor(props) {
      super(props)

      var item = props.navigation.state.params && this.props.navigation.state.params.item

      this.state = {
        invalidFields:[],
        data: item || {
          company: '',
          fecha: '',
          description: '',
          id:null
        }

     }
 }

 // componentDidMount(){
 //   if(this.props.navigation.state.params && this.props.navigation.state.params.item){
 //     this.setState( {data: this.props.navigation.state.params.item} );
 //   }
 // }

 onAccept = () => {
   var _this = this
   var callback = this.props.navigation.state.params && this.props.navigation.state.params.callback

   if(this.validate()){
     this.props.saveProfileCareerItem(this.state.data, () => {
       callback && callback(_this.state.data)
       _this.props.navigation.goBack()
     });
   }else{
     return true;
   }
 }

 validate = () => {
   var invalidFields = [];
   var valid = true;

   ['company', 'description', 'fecha'].forEach(prop => {
     if(!this.state.data[prop]){
       invalidFields.push(prop)
       valid = false
     }
   })

   if(!valid){
     this.setState({invalidFields})
   }

   return valid;
 }

  onDelete = () => {
    if(this.state.data.id){
      var userId = this.props.navigation.state.params && this.props.navigation.state.params.userId
      this.props.deleteProfileCareerItem( userId, this.state.data.id)
      this.props.navigation.goBack();
    }
  }

 setVal = (prop, val ) => this.setState( prevState => {
     prevState.data[prop] = val
     return prevState
   })

  render() {
    const navigation = this.props.navigation;
    var state = this.state.data;
    var invalidFields = this.state.invalidFields

    return (
      <StackView navigation={navigation} title={I18n.t('profile.career.addExp')}  onAccept={this.onAccept} headerBtn={state.id && <HeaderBtn icon='trash-o' handler={this.onDelete} style={{padding:10}}/>}>
         <View >
          <InputListItem invalid={invalidFields.indexOf('company') >= 0} icon='bank' label={I18n.t('profile.career.companyName')} value={state.company} onChangeText={(text) => this.setVal('company', text)}/>
          <InputListItem invalid={invalidFields.indexOf('fecha') >= 0} icon='calendar' label={I18n.t('profile.career.when')} value={state.fecha} onChangeText={(text) => this.setVal('fecha', text)}/>
          <LongInputListItem invalid={invalidFields.indexOf('description') >= 0} icon='quote-left' label={I18n.t('profile.career.desc')} value={state.description} onChangeText={(text) => this.setVal('description', text)}/>
         </View>
     </StackView>
    );
  }
}

export default connect(mapStateToProps, profileActions)(EditProfileAddExperience);
