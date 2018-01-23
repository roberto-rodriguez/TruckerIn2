import React, { Component } from "react";
import { View } from 'react-native';
import {StackView, LongInputListItem, RowColumn, T15, AgentMsg} from 'src/components/'
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
   var params = this.props.navigation.state.params || {}

   setTimeout(() => this.setState(params), 200)
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
      <StackView navigation={navigation} title={I18n.t(['profile', 'titles', roleId === 2 ? 'aboutMe' : 'aboutUs'])}  onAccept={this.onAccept}  >
      <View>
         <AgentMsg text={I18n.t(['signup', 'about', (roleId === roles.BROKER ? 'descBroker' : 'descCompany')])}/>

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
  var profileInfo = globalReducer.profileInfo

  return {
    isMe,
    about: profileInfo.about,
    roleId: profileInfo.roleId
  }
}

export default connect(mapStateToProps, profileActions)(EditAbout);
