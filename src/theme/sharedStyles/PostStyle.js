import React, {Component} from 'react';
import {Image,View, StyleSheet,Dimensions, Platform, TouchableHighlight  } from 'react-native';

const commonColor = require("src/theme/variables/commonColor");
const availableWidth = Dimensions.get("window").width - 32;

export default StyleSheet.create({
    container:{
      marginLeft:5,
      marginRight:5,
      padding:15
    },
    header:{
      marginBottom:15,
      justifyContent:'space-between',
      flexDirection: 'row'
    },
    headerLeft:{
      flexDirection: "row",
      width:availableWidth * 0.75
    },
    headerRight:{
      flexDirection: "column",
      width: availableWidth * 0.2,
     justifyContent:'flex-start',
     alignItems: 'flex-end'
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
    }
  });
