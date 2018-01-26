const React = require("react-native");
const { Platform } = React;
const commonColor = require("src/theme/variables/commonColor");
import theme from 'src/theme/variables/platform'

export default {
  drawerContent: {
    paddingTop: Platform.OS === "android" ? 0 : 30,
//    backgroundColor:theme.primaryColor// "rgba(59, 90, 148, 0.9)"
  },
  userDataListitem: {
    paddingBottom: 15,
    paddingLeft: 15, //  Platform.OS === "android" ? 0 : 0,
    marginLeft: 0,
    marginTop: 0,
    paddingTop: 15,
    position: "relative",
    backgroundColor:theme.primaryColor
  },
  item:{
     paddingTop: 10,
     paddingBottom: 10 ,
     backgroundColor: 'white'
  },
  userDataNameText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  userDataDescriptionText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 13,
    fontWeight: "bold"
  },
  userDataArrowIcon: {
    color: "rgba(255,255,255,0.3)",
    position: "absolute",
    right: 10,
    top: 25
  },
  menuHeadView: {
    backgroundColor: "#f7f7f7"
  },
  menuHeaderText: {
    color: commonColor.lightTextColor,
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10
  },
  menuIconContainerView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  menuIcon: {
    fontSize: Platform.OS === "ios" ? 18 : 18,
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  menuItemText: {
    paddingLeft: 15,
    color: commonColor.contentTextColor,
    fontSize: 15
  },
  contactListView: {
    backgroundColor: "#f7f7f7",
    borderTopWidth: 1,
    borderTopColor: "#DDDEE3",
    paddingBottom: 30
  }
};
