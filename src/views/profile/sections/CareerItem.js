import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Container } from "native-base";
import {  T13, T12, nav } from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
//TODO remove npm install react-native-easy-grid --save

class CareerItem extends Component {

  constructor(props){
    super(props)

    this.state = { ...props.careerItem }
  }

  edit = () => {
    this.props.isMe && nav(this.props.navigation, 'EditProfileAddExperience', {item: this.props.careerItem, callback: this.onEdit})
  }

  onEdit = (item) => this.setState(item)


  render() {
    var {id, company, fecha, description} = this.state

    return (
      <TouchableOpacity style={styles.item} onPress={this.edit}>
        <View>
          <T13 strong>{company}</T13>
          <T12 light>{fecha}</T12>
          <T12>{description}</T12>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-start',
    borderWidth:0.2,
    borderColor:'grey',
    padding:10,
    borderRadius:5,
    margin:8
  }
})

  export default connect( )( CareerItem);
