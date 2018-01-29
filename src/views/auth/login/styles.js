const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const commonColor = require("src/theme/variables/commonColor");

export default {
  videoContainer:{
    height: 336,
    backgroundColor: '#FFFFFF50',
    shadowOffset: { width: 20, height: 20 },
    shadowRadius: 20,
    shadowOpacity: 20,
  },
  backgroundVideo: {
    position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },
  backgroundContainer: {
    backgroundColor: "#fff"
  },
  logoContainerView: {
    height: deviceHeight - 336 - 5,
    alignItems: 'center',
    justifyContent: "center",
  },
  imageShadow: {
    width: ( deviceWidth / 6 ) * 4,
  //  height: deviceWidth / 4,
    resizeMode: "contain",
    alignSelf: "center",
  //  marginTop: deviceHeight / 10
  },
  formContainerView: {
    height: deviceHeight / 2,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 49,
  //  paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  formView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputGrp: {
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: "row",
    marginBottom: 18
  },
  formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10
  },
  loginField:{
     backgroundColor: '#FFFFFF99',
     borderTopLeftRadius: 5,
     borderTopRightRadius: 5,
     borderColor:commonColor.primaryColor,
     borderWidth: 0.3
   }, 
  loginBtn: {
    backgroundColor: "#4E69A2",
    borderRadius: 6,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 10,
  //  marginTop: 15,
    marginBottom: 7
  },
  loginBtnText:{ lineHeight: 16, fontWeight: "bold" }
};
