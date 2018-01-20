import React, { Component } from "react";
import {  AgentMsg } from "src/components/"; 

import { connect } from "react-redux";


class NoConnectionsHeader extends Component {

  render = () => (
      <AgentMsg text={'Hey ' +  this.props.name  + ', I see you still dont have any connection, these are some people you might know'}/>
    )
}

const mapStateToProps = ({globalReducer}) => ({
  name: globalReducer.profileInfo.firstName
});


 export default connect(mapStateToProps )(NoConnectionsHeader);
