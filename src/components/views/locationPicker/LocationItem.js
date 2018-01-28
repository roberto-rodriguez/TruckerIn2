/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import {Row, Column, T15 } from 'src/components/'
import theme from 'src/theme/variables/platform'
import { connect } from "react-redux";
import  * as locationsActions from './locations.actions'

class LocationItem extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
      return true;
    }
     return nextProps.shouldUpdate
  }

 onSelect = () => {
   debugger;
   var {value, label} = this.props

   this.props.selectCity(value)

   this.props.handler(value, label)
 }



  render() {
    var {label, value, handler, selected} = this.props;

    var style = selected && {backgroundColor: theme.lightGreen}

    return (
      <TouchableHighlight  underlayColor={'transparent'}  onPress={() => handler(value, label)}>
       <View  style={style}>
         <Row h={60}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column start h={60} >
             <T15 strong={selected} >{label}</T15>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    )
  }

}


const mapStateToProps = ({locationReducer}, ownProps) => ({
  selected: locationReducer[ownProps.selectedFieldName] === ownProps.value
})


export default connect(mapStateToProps, locationsActions )(LocationItem);
