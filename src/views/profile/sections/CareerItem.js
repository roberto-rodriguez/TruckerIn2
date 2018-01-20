import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Container } from "native-base";
import {  T13, T12, nav } from 'src/components/'
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import * as profileActions from "src/views/profile/profile.actions";
//TODO remove npm install react-native-easy-grid --save

class CareerItem extends Component {

  edit = () =>  this.props.isMe && nav(this.props.navigation, 'EditProfileAddExperience', {item: this.props.careerItem})

  render() {
    var {id, company, date, desc} = this.props.careerItem

    return (
      <TouchableOpacity style={styles.item} onPress={this.edit}>
        <View>
          <T13 strong>{company}</T13>
          <T12 light>{date}</T12>
          <T12>{desc}</T12>
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
