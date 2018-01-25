import React, {Component} from "react";
import {View, Image, StyleSheet} from "react-native";
import {  Header  } from "native-base";
import { AgentImg, Row, Column, T14 } from "src/components/";
import theme from 'src/theme/variables/platform';
import styles from './styles'
import { connect } from "react-redux";
import MenuBtn from './buttons/MenuBtn'
import BackBtn from './buttons/BackBtn'
import Search from './Search'
import Title from './Title'

 class CustomHeader extends Component {

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
          {
           headerNotification && ( <View style={{backgroundColor: '#d5f4e6', borderBottomWidth: 0.2, borderColor: theme.primaryColor}}>
              <Row h={60}>
                <Column h={60} columns={6} colspan={1}>
                  <AgentImg size={50}/>
                </Column>
                <Column h={60} columns={6} colspan={5}>
                  <T14 style={{color:theme.primaryColor, paddingLeft: 5}}>{headerNotification}</T14>
                </Column>
              </Row>
            </View>
          )
          }
        </View>
      );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  showHeaderNotification: globalReducer.view.showHeaderNotification,
  headerNotification: globalReducer.view.headerNotification
});

  export default connect(mapStateToProps)(CustomHeader);
