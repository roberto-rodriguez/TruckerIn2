/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {RowColumn, Row, Column, T12, CustomButton } from 'src/components/'
import Icon from 'react-native-fa-icons';
import Prompt from 'react-native-prompt';


 export default class PhoneField extends Component {

   state = {
     promptVisible: false,
     phone: '234567890'
   }

  render() {
    var {icon, label, value, invalid } = this.props;
    value = 1;

    return (
       <View  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
         <RowColumn  h={25}>
           <T12 light red={invalid}>{label}</T12>
         </RowColumn>
         <Row h={45}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column  h={45}  columns={3}  >
              <CustomButton radius={'left'} white={value != 0} text={'No Llamadas'} handler={()=>handler(1)} style={{width:'99%'}}/>
           </Column>
           <Column  h={45}  columns={3}  >
              <CustomButton radius={false} white={value != 1} text={this.state.phone} handler={()=>handler(1)} style={{width:'99%'}}/>
           </Column>
           <Column  h={45} columns={3} >
              <CustomButton radius={'right'} white={value != 2} text={'Otro Number'} handler={() => this.setState({promptVisible: true})} style={{width:'99%'}}/>
           </Column>
         </Row>

         <Prompt
              title="Enter Phone Number"
              placeholder="Phone Number"
              defaultValue=""
              visible={ this.state.promptVisible }
              onCancel={ () => this.setState({
                promptVisible: false
              }) }
              onSubmit={ (phone) => this.setState({
                promptVisible: false,
                phone
              }) }/>
       </View>
    );
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
