import React, { Component } from "react";
import { View } from 'react-native';
import {StackView, LongInputListItem, RowColumn, T15} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

class EditAbout extends Component {

  constructor(props) {
      super(props)

      this.state = {
        about: ''
     }
 }

 componentDidMount(){
   this.setState(this.props.navigation.state.params ? this.props.navigation.state.params : {});
 }

 onAccept = () => {
   this.props.saveAbout(this.state);
   this.props.navigation.goBack();
 }

 setVal(prop, val ) {
   this.setState({
      [prop]: val
   })
 }

  render() {
    const {navigation, roleId} = this.props
    var data = this.state;

    return (
      <StackView navigation={navigation} title={I18n.t('profile.career.addExp')}  onAccept={this.onAccept}  >
      <View>
          <RowColumn h={90}>
            <T15 green>{I18n.t(['signup', 'about', (roleId === roles.BROKER ? 'descBroker' : 'descCompany')])}</T15>
          </RowColumn>

          <LongInputListItem icon='quote-left'
            label={ I18n.t( 'general.typeHere' ) }
            value={data['about']}
            onChangeText={(text) => this.setVal('about', text)}/>
     </View>

     </StackView>
    );
  }
}

const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var isMe = ownProps.isMe;
  var profileInfo = isMe ? globalReducer.profileInfo : profileReducer.profileInfo

  return {
    isMe,
    about: profileInfo.about,
    roleId: profileInfo.roleId
  }
}

export default connect(mapStateToProps, profileActions)(EditAbout);
