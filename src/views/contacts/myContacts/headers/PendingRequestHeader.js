import React, { Component } from "react";
import { View } from "react-native";
import {  AgentMsg, T11, T14, nav } from "src/components/";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";

class PendingRequestHeader extends Component {

  render() {
    const {navigation, pendingRequest, name, onPendingRequestCallback} = this.props

    if(!pendingRequest)return null;

    return (
      <AgentMsg onPress={()=> nav(navigation, 'PendingRequestList', {onPendingRequestCallback})}  >
        <View>
          <T14 green>{'Hey ' + name +  I18n.t('contacts.headers.pending1')}<T14 strong red>{pendingRequest}</T14>{I18n.t('contacts.headers.pending2')}</T14>
        <T11 green>{I18n.t('contacts.headers.click2see')}</T11>
        </View>
      </AgentMsg>
    )
  }
}

const mapStateToProps = ({globalReducer}) => ({
  pendingRequest: globalReducer.profileInfo.pendingRequest,
  name: globalReducer.profileInfo.firstName
});

export default connect(mapStateToProps, contactActions)(PendingRequestHeader);
