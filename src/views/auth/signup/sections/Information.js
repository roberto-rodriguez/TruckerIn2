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

  constructor(props) {
      super(props)
      this.state = { }
 }

 componentDidMount(){
     this.setState(this.props.data)
 }

 setVal = (prop, val, valId) => {
   this.setState((prevState) => {
        prevState[prop] = val

        if(valId){ prevState[prop + 'Id'] = valId }

        return prevState
     })

     this.props.setVal(prop, val, valId)
 }

 showSelect(prop) {
   this[prop + 'Select'].show();
 }

  render() {
    const { navigation, invalidFields} = this.props
    var data  = this.state;
    return (
          <View >
             {
              items.map( ({icon, title, prop}, i) => (
              <InputListItem
                 key={i}
                 icon={icon}
                 label={title}
                 value={ data[prop] }
                 invalid={ invalidFields.indexOf(prop) >= 0}
                 onChangeText={(text) => this.setVal(prop, text)}
                 secureTextEntry={ prop === "password" ? true : false}
                 />) )
            }
         </View>
    );
  }
}

export default connect( mapStateToProps )(Information);
