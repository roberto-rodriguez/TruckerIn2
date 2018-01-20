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

      this.state = {
        company: '',
        date: '',
        desc: '',
        id:null
     }
 }

 componentDidMount(){
   this.setState(this.props.navigation.state.params ? this.props.navigation.state.params.item : {});
 }

 onAccept = () => {
   this.props.saveProfileCareerItem(this.state);
   this.props.navigation.goBack();
 }

onDelete = () => {
  if(this.state.id){
    this.props.deleteProfileCareerItem( this.state.id )
    this.props.navigation.goBack();
  }
}

 setVal(prop, val ) {
   this.setState({
      [prop]: val
   })
 }

  render() {
    const navigation = this.props.navigation;
    var state = this.state;

    return (
      <StackView navigation={navigation} title={I18n.t('profile.career.addExp')}  onAccept={this.onAccept} headerBtn={state.id && <HeaderBtn icon='trash-o' handler={this.onDelete} style={{padding:10}}/>}>
         <View >
          <InputListItem icon='bank' label={I18n.t('profile.career.companyName')} value={state.company} onChangeText={(text) => this.setVal('company', text)}/>
          <InputListItem icon='calendar' label={I18n.t('profile.career.when')} value={state.date} onChangeText={(text) => this.setVal('date', text)}/>
          <LongInputListItem icon='quote-left' label={I18n.t('profile.career.desc')} value={state.desc} onChangeText={(text) => this.setVal('desc', text)}/>
         </View>

     </StackView>
    );
  }
}

export default connect(mapStateToProps, profileActions)(EditProfileAddExperience);
