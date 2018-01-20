/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button, Thumbnail } from "native-base";
import styles from '../styles'
import {nav} from 'src/components/'
const profileImg = require("../../../../assets/contacts/yo.png");

class ProfileBtn extends Component {

  render(){
    var {icon, disabled, handler, style} = this.props;
    var {navigation} = this.props;
    var disabledStyle = disabled ? {color: global.secondaryColor} : null

    return (
      <Button  transparent onPress={() => nav(navigation, 'Profile')}  style={{padding:10, justifyContent:'center'}} >
        <Thumbnail extrasmall source={profileImg} />
      </Button>
    )
  }
}

export default ProfileBtn;
