import React, {Component} from "react";
import {View, Image, StyleSheet} from "react-native";
import {  Header  } from "native-base";
import theme from 'src/theme/variables/platform';
import styles from './styles'
import { connect } from "react-redux";
import MenuBtn from './buttons/MenuBtn'
import BackBtn from './buttons/BackBtn'
import Search from './Search'
import Title from './Title'

export default class CustomHeader extends Component {

  render() {
      const {navigation, back, title
        ,searchHandler
        ,onSearchChangeText
        ,searchDefaultValue
        ,left, right , toLeft, toRight,
        headerNotification, onBack
       } = this.props;

      var leftBtn = left ? left : (  back ? <BackBtn navigation={navigation} onBack={onBack}/> : <MenuBtn navigation={navigation} /> )
      var centerSide = searchHandler ?
      <Search green
        searchHandler={searchHandler}
        onChangeText={onSearchChangeText}
        searchDefaultValue={searchDefaultValue}
        title={title}
        />
      : <Title title={title}/>

      return (
        <View>
          <Header searchBar  >
            {leftBtn}
            {toLeft}
            {centerSide}
            {toRight}
            {right}
          </Header>
        </View>
      );
  }
}
