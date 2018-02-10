/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { T14,T12,  SimpleButton, ConnectButton, Avatar, nav } from 'src/components/'
import { Container, Left, Right, Body, Icon,  ListItem } from "native-base";
import * as ConnectionStatus from 'src/components/c/ConnectionStatus'

 export default class ContactListItem extends Component {

 shouldComponentUpdate(nextProps, nextState){
   if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
     return true;
   }
    return nextProps.shouldUpdate
 }

  render() {
    var {navigation} = this.props
    var userInfo
    var {id, userName, locationName, role, profileImg} = userInfo = this.props.data;

    return (
      <ListItem button thumbnail style={{backgroundColor:'white'}}>
        <Left>
         <SimpleButton  onPress={()=> nav(navigation, "Profile", { userInfo }) }>
            <View>
              <Avatar name={userName} src={profileImg}/>
            </View>
          </SimpleButton>
        </Left>

         <Body >
          <SimpleButton onPress={()=> nav(navigation, "Profile", { userInfo }) }>
            <View>
              <T14>
                { userName }
              </T14>
              <T12 light shortLine>
                { locationName}
              </T12>
              <T12 light shortLine>
                {role}
              </T12>
            </View>
            </SimpleButton>
          </Body>

          <Right >
            {this.buildRightButton()}
          </Right>

      </ListItem>
    );
  }

  buildRightButton = () => {
    var {navigation, data} = this.props

    if(data.connectionStatus === ConnectionStatus.CONNECTED){
      return (<TouchableHighlight underlayColor={'transparent'}  onPress={()=> nav(navigation, "Chat", { id: data.id, name: data.userName })}  style={{padding:20}}>
                <View>
                  <Icon
                    active
                    name="chatbubbles"
                    style={{color: 'grey' }}
                  />
                </View>
              </TouchableHighlight>)
    }else{
       return (<ConnectButton contactId={data.id} name={data.userName} connectionStatus={data.connectionStatus}/>)
    }

  }
}


const styles = StyleSheet.create({
    icon: {
      fontSize: 18
    },
    input:{
      width:'100%',
      height: 35,
      padding:0
    }
  })
