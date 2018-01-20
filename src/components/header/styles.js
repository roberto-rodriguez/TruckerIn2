const React = require("react-native");
const { Dimensions, Platform } = React;
import {  StyleSheet} from "react-native";
import theme from 'src/theme/variables/platform'

export default StyleSheet.create({
  sidebarIcon: {
    resizeMode: "contain",
    height: 28,
    width: 28
  },
  rightBtn: {
    alignSelf: "center",
    marginLeft:14,
    marginRight:8 
  },
  leftBtn: {
    alignSelf: "center",
    marginLeft:8,
    marginRight:14
  },
  icon:{
    fontSize:18,
    color: 'white'
  },
  title:{
    color:'white', width:'100%', textAlign:'center'
  },
  IconBadge: {
    position:'absolute',
    top:5,
    right:0,
    minWidth:15,
    height:16,
    borderRadius:15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding:0,
    margin:0
  },
  IconBadgeText:{
    color:'white',
    height:16,
    padding:0,
    borderRadius:15,
    marginBottom:5
  }
});
