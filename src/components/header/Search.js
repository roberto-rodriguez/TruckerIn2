/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Input, Icon, Button } from "native-base";
import theme from 'src/theme/variables/platform'

export default class Search extends Component {
  render(){
    var {title, searchHandler, onChangeText, green, searchDefaultValue, style} = this.props;

    var styles = green ? stylesGreen : stylesWhite
    var placeholderTextColor = green ? 'white' : theme.secondaryColor

    return (
    <Item style={[style, styles.searchBar]}>
      <Button transparent onPress={searchHandler} style={styles.searchButton} >
        <Icon name="search" style={styles.searchIcon} />
      </Button>
      <Input
        placeholderTextColor={placeholderTextColor}
        placeholder={title}
        onChangeText={(text) => onChangeText(text)}
        style={styles.input}
        defaultValue={searchDefaultValue}
      />
    </Item>)
  }
}


const stylesGreen = StyleSheet.create({
  searchBar:{
    width:'90%',
    marginLeft: '5%',
    height:40,
    borderRadius: 10,
    borderWidth:0.5,
    backgroundColor: theme.secondaryColor
  },
  searchButton:{
    height:'100%'
  },
  searchIcon:{
    color: 'white',
    padding:10
  },
  input:{
    marginTop:5,
    color: 'white',
    fontSize: 15
  }
});


const stylesWhite = StyleSheet.create({
  searchBar:{
    width:'90%',
    marginLeft: '5%',
    height:45,
    borderRadius: 10,
    borderWidth:0.5,
    borderColor: theme.secondaryColor
  },
  searchButton:{
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height:'100%',
    backgroundColor: theme.secondaryColor
  },
  searchIcon:{
    color:'white',
     padding:10
  },
  input:{
//    marginTop: 5,
    color: theme.secondaryColor,
    fontSize: 15
  }
});
