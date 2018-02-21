import React, {Component} from 'react';
import {Image,View, StyleSheet,Dimensions, Platform, TouchableHighlight  } from 'react-native';

const commonColor = require("src/theme/variables/commonColor");
const availableWidth = Dimensions.get("window").width - 32;

export default StyleSheet.create({
    headline:{
      paddingBottom: 5,
      marginBottom: 5,
      borderBottomColor: commonColor.secondaryColor,
      borderBottomWidth: 0.3
    },
    details:{
      marginTop: 20,
      borderColor: commonColor.secondaryColor,
      borderWidth: 0.3
    },
    container:{
      marginLeft:5,
      marginRight:5,
      padding:15,
      paddingTop:5
    },
    header:{
      paddingTop: 5,
      // marginBottom:15,
      justifyContent:'space-between',
      flexDirection: 'row'
    },
    headerLeft:{
      flexDirection: "row",
      width:availableWidth * 0.70
    },
    headerRight:{
      flexDirection: "column",
      width: availableWidth * 0.25,
      justifyContent:'flex-start',
    // alignItems: 'center'
    },
    settingsIcon:{
      fontSize:16,
      color:commonColor.secondaryColor
    },
    subAuthorText:{
      marginTop: 3,
      width:availableWidth * 0.75 - 50
    },
    text:{
      fontSize: 12
    },
    smallText:{
      fontSize: 12, color: commonColor.lightTextColor
    },
    strong:{
      fontWeight: "bold"
    },
    thumbnail: {
      height: 60,
      width: 60
    },
    postImage:{
      width: (availableWidth - 10),
      height: (availableWidth - 30)
    },
    centered:{
      alignItems:'center',
      justifyContent:'center'
    },
    horizontalPadding10: {
      paddingLeft: 10, paddingRight: 10
    },
    horizontalPadding15: {
      paddingLeft: 15, paddingRight: 15
    },
    horizontalPadding20: {
      paddingLeft: 20, paddingRight: 20
    },
    postFooter: {marginTop: 10, height: 45, flexDirection: 'row', justifyContent: 'space-between'},
    button: {width:70, marginTop:10},
  });
