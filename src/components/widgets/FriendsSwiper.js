/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import {
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'
import CustomButton from 'src/components/button/CustomButton'
import data from 'src/views/social/messages/data'
const lightTextColor = require("src/theme/variables/commonColor").lightTextColor;

 class FriendsSwiper extends Component {

  render() {
    return (
        <View style={{height:180, backgroundColor:'white'}}>
         <ScrollView horizontal
         showsHorizontalScrollIndicator={false}>

         {
           data.map( (d, i) => (<FriendCard name={d.name} picture={d.thumbnail} key={i}/>))
         }
         </ScrollView>
        </View>
    );
  }

}

class FriendCard extends Component {

 render() {
   var {name, picture} = this.props;

   return (
       <View style={styles.swiper}>
         <View style={styles.header}>
           <Text  style={styles.headerText}>{name}</Text>
         </View>
         <Thumbnail square extralarge source={picture} style={styles.thumbnail}>
         <View style={styles.commonFriendsBar}>
         <Text  style={styles.commonFriendsText}>12 Amigos en comun</Text>
         </View>
         </Thumbnail>
         <View style={styles.buttonsBar}>
           <CustomButton radius={'left'} icon='user-plus'/>
           <CustomButton radius={'right'} white icon='trash'style={{height:28, width:60}}/>
         </View>
       </View>
   );
 }

}

const styles = StyleSheet.create({
  swiper:{
    width:140,
    height:180,
    backgroundColor:'white',
    flexDirection: "column"
  },
  header:{
    backgroundColor: 'white',
    height: 30,
    width:'100%',
    justifyContent: "center"
  },
  headerText:{
    textAlign: 'center',
    color:lightTextColor,
    fontSize:12
  },
  thumbnail:{
    marginHorizontal:10
  },
  commonFriendsBar:{
    height:20, backgroundColor:'rgba(52, 52, 52, 0.6)', position:'absolute', top: 100,  width:'100%'
  },
  commonFriendsText:{
    textAlign: 'center', color:lightTextColor, fontSize:11
  },
  buttonsBar:{
    height: 30, width:'100%', justifyContent: "center", flexDirection: "row"
  }
});

export default FriendsSwiper;
