/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from 'src/theme/variables/platform'
import Search from 'src/components/header/Search'

  export default class LocationSearch extends Component {

 onSelect = () => {
   debugger;
   var {value, label} = this.props

   this.props.selectCity(value)

   this.props.handler(value, label)
 }

  render() {
    var {title, value, onSearchChangeText, searchHandler} = this.props;

    return (
      <View  style={styles.searchBar}>
         <Search title={title} onChangeText={onSearchChangeText} searchDefaultValue={value} searchHandler={searchHandler}/>
     </View>
    )
  }

}



const styles = StyleSheet.create({
  searchBar:{paddingTop: 10, paddingBottom: 7, borderBottomWidth:0.3, borderColor: global.secondaryColor}
});
