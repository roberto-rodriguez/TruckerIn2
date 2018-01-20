import React, { Component } from "react";
import { View } from "react-native";
import {  AgentMsg, T11, T14, nav } from "src/components/";

import { connect } from "react-redux";
import * as contactActions from "../../reducer/contactActions";

class PendingRequestHeader extends Component {

  render() {
    const {navigation, pendingRequest, name} = this.props

    if(!pendingRequest)return null;

    return (
      <AgentMsg onPress={()=> nav(navigation, 'PendingRequestList')}  >
        <View>
          <T14 green>Hey {name}, there are <T14 strong red>{pendingRequest}</T14> people that wants to connect with you.</T14>
          <T11 green>( Click here to see )</T11>
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
