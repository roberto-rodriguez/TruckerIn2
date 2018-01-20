import React, { Component } from "react";
import { View , Text } from 'react-native';
import {  Select, InputListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";

const items = [
  { icon: 'user-circle-o',   title: 'First Name', prop: 'firstName'},
  { icon: 'user-circle',   title: 'Last Name', prop: 'lastName'},
  { icon: 'user-o',   title: 'Username', prop: 'username'},
  { icon: 'lock',   title: 'Password', prop: 'password'}
]


class Information extends Component {


 showSelect(prop) {
   this[prop + 'Select'].show();
 }

  render() {
    const { data, setVal, navigation} = this.props
    debugger;
    return (
          <View >
             {
              items.map( ({icon, title, prop}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={title}
                 value={ data[prop] }
                 onChangeText={(text) => setVal(prop, text)}
                 secureTextEntry={ prop === "password" ? true : false}
                 />) )
            }
         </View>
    );
  }
}

export default connect( mapStateToProps )(Information);
