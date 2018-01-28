import React, { Component } from "react";
import {  AgentMsg } from "src/components/";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";


class NoConnectionsHeader extends Component {

  render = () => (
      <AgentMsg text={'Hey ' +  this.props.name  + I18n.t('contacts.headers.noConn')}/>
    )
}

const mapStateToProps = ({globalReducer}) => ({
  name: globalReducer.profileInfo.firstName
});


 export default connect(mapStateToProps )(NoConnectionsHeader);
