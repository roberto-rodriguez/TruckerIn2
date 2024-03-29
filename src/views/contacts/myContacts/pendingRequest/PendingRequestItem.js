/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {Row, Column, T14, T12, SimpleButton, Avatar } from 'src/components/'

import theme from 'src/theme/variables/platform';
import Icon from 'react-native-fa-icons';

import * as contactActions from "src/views/contacts/contacts.actions";
import { connect } from "react-redux";

 class PendingRequestItem extends Component {

   constructor(props){
     super(props)
     this.state = {
       deleted: false
     }
   }

 shouldComponentUpdate(nextProps, nextState){
   if(this.state.deleted || nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
     return true;
   }
    return nextProps.shouldUpdate
 }

 answerRequest = (action) => this.props.updateUserRelation(this.props.data.id, action, () => this.setState({deleted: true}) )

 
  render() {
    var {navigation} = this.props
    var dataRow;
    var { userName, locationName, roleId, profileImg} = dataRow = this.props.data;

    if(this.state.deleted){
      return null
    }

    return (
      <View  style={styles.view}>
        <Row h={70}>
          <Column h={70} columns={6} colspan={1} >
            <SimpleButton  onPress={()=> nav(navigation, 'Profile', {userInfo: dataRow} )}>
               <View><Avatar name={userName} src={profileImg}/></View>
             </SimpleButton>
          </Column>
          <Column h={70} columns={6} colspan={3} start>
            <SimpleButton onPress={() => nav(navigation, 'Profile', {userInfo: dataRow} )} style={{marginLeft: 10}}>
              <View>
                <T14>
                  { userName }
                </T14>
                <T12 light shortLine>
                  { locationName}
                </T12>
                <T12 light shortLine>
                  { this.props.roleOptionsObj[ roleId ] || ''}
                </T12>
              </View>
            </SimpleButton>
          </Column>
          <Column h={70} columns={6} colspan={1}>
            <SimpleButton  onPress={()=>this.answerRequest('accept')}
               style={styles.button}>
                <View>
                  <Icon name='check' style={styles.icon}/>
                </View>
             </SimpleButton>
          </Column>
          <Column h={70} columns={6} colspan={1}>
            <SimpleButton  onPress={()=>this.answerRequest('decline')}
               style={[styles.button, {borderColor:'red'}]}>
                <View>
                  <Icon name='times' style={[styles.icon, {color: 'red'}]}/>
                </View>
             </SimpleButton>
          </Column>
        </Row>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    icon:{
      color:theme.secondaryColor,
      fontSize: 20
    },
    button:{
      borderWidth: 0.5,
      borderColor:theme.secondaryColor,
      width: 40,
     height: 40,
     borderRadius: 20,
     alignItems: "center",
     justifyContent: "center"
   },
   view: {
     paddingVertical: 5,
     borderColor:theme.secondaryColor,
     borderBottomWidth: 0.3,
     paddingBottom:10
   }
  })


    const mapStateToProps = ({globalReducer}) => ({
      roleOptionsObj: globalReducer.config.roleOptionsObj
    });

    export default connect(mapStateToProps, contactActions)(PendingRequestItem);
