const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const commonColor = require("src/theme/variables/commonColor");

export default {
  greenColor: {
    color: commonColor.primaryColor
  },
  bullet:{
    paddingBottom: 1,
    width:22,
    borderRadius:11,
    alignItems: 'center',
    justifyContent: "center",
  },
  redBullet:{
    backgroundColor: 'red'
  },
  selectedBullet: {
    backgroundColor: commonColor.primaryColor
  },
  deselectedBullet: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: commonColor.primaryColor
  },
  background: {
    backgroundColor: "#fff"
  },
  logoContainerView: {
    height: deviceHeight / 3,
    backgroundColor: commonColor.primaryColor,
    alignItems: 'center',
    justifyContent: "center",
  },
  imageShadow: {
    width: deviceWidth / 7,
    height: deviceHeight / 7,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: deviceHeight / 15
  },
  formContainerView: {
    padding: 30,
    paddingTop: 20
  },
  inputGrp: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: commonColor.lightTextColor,
    marginBottom: 8
  },
  createBtn: {
    backgroundColor: "#4E69A2",
    borderRadius: 0,
    marginTop: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowOpacity: 0
  },
  footerView: {
    flex: 1,
    height: deviceHeight / 10
    // paddingTop: deviceHeight < 600 ? 5 : Platform.OS === "android" ? 10 : 15,
  },
  signInBtn: {
    alignSelf: "center",
    borderRadius: 0,
    bottom: deviceHeight < 600 ? 0 : -10,
    borderColor: commonColor.lightTextColor,
    position: "absolute"
  },
  signInBtnText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  accessCode:{
    paddingTop: 0,
    margin: 0,
    lineHeight: 44,
    fontSize: 50,
    height:60,
    width: 136,
    borderColor: commonColor.secondaryColor,
    borderWidth:1,
    borderRadius: 15
  },
  backArrow:{
    position:'absolute',
    left:15,
    top:15
  },
  stepIndicator:{
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: commonColor.primaryColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: commonColor.primaryColor,
    stepStrokeUnFinishedColor: commonColor.primaryColor,
    separatorFinishedColor:commonColor.primaryColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: commonColor.primaryColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: commonColor.primaryColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 11,
    currentStepLabelColor:commonColor.primaryColor,
  }
};
