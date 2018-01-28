/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button, Thumbnail } from "native-base";
import styles from '../styles'
import {Avatar, nav} from 'src/components/'
import { connect } from "react-redux";
 
class ProfileBtn extends Component {

  render(){
    var {navigation, fullName, profileImg} = this.props;

    return (
      <Button  transparent onPress={() => nav(navigation, 'Profile')}  style={{padding:10, justifyContent:'center'}} >
        <Avatar name={fullName} src={profileImg} size={35}/>
      </Button>
    )
  }
}


const mapStateToProps = ({globalReducer}) => ({
  profileImg: globalReducer.profileInfo.profileImg,
  fullName: globalReducer.profileInfo.firstName + ' ' + globalReducer.profileInfo.lastName
})

 export default connect(mapStateToProps )(ProfileBtn);
