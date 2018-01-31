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

class CityItem extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
      return true;
    }
     return nextProps.shouldUpdate || this.props.selected !== nextProps.selected
  }

 onSelect = () => {
   var {value, label} = this.props

   this.props.selectCity(value, label)

   this.props.handler(value, label)
 }



  render() {
    var {label, value, handler, selected} = this.props;

    var style = selected && {backgroundColor: theme.lightGreen}

    return (
      <TouchableHighlight  underlayColor={'transparent'}  onPress={() => this.onSelect()}>
       <View  style={style}>
         <Row h={60}  style={{borderBottomWidth:0.3, borderBottomColor: global.secondaryColor}}>
           <Column start h={60} >
             <T15 strong={selected} red={value === 1}>{label}</T15>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    )
  }

}


const mapStateToProps = ({locationReducer}, ownProps) => ({
    selected: locationReducer.cityId === ownProps.value
  })

export default connect(mapStateToProps, locationsActions)(CityItem);
