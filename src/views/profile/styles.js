const React = require("react-native");
const { Dimensions, Platform, PixelRatio } = React;

const commonColor = require("src/theme/variables/commonColor");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  headerIcon: {
    color:commonColor.lightTextColor, // "#697080",
    fontSize: 20
  },
  coverBlock: {
    height: deviceHeight / 4,
    width: deviceWidth
  },
  coverImage: {
    flex: 1
  },
  extraSmallText: {
    fontSize: 10,
    color: commonColor.lightTextColor,
    alignSelf: "center",
    opacity:0.7
  },
  profileImgInnerView: {
    position: "absolute",
    top: -(deviceWidth / 3),
    left: deviceWidth / 4,
    width: deviceWidth / 2,
    height: deviceWidth / 2,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "white"
  },
  profileImg: {
    height: deviceWidth / 2 - 10,
    width: deviceWidth / 2 - 10
  },
  profileImgEditView: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 25,
    width: 60,
    backgroundColor: "rgba(206,208,203,0.8)",
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 3
  },
  editCamIcon: {
    marginRight: 5,
    fontSize: 20
  },
  profileNameContainerView: {
    marginTop: deviceWidth / 6 + 5,
    paddingBottom: 15
  },
  pendingPostText: {
    fontSize: 13,
    color: "#658ECE",
    alignSelf: "center",
    paddingBottom: 4
  },
  optionsContainerView: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    marginTop: 5,
    borderTopWidth: 1, // 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderBottomWidth: 1, // 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderTopColor: "#F3F3F3",
    borderBottomColor: "#F3F3F3"
  },
  optionBtn: {
    flexDirection: "column",
    alignItems: "center"
  },
  optionText: {
    color: "#697080",
    marginTop: 10,
    fontSize: 12
  },
  editProfileButton:{
      position: "absolute",
      bottom: 0,
      left:deviceWidth / 4 - 22,
      width: 40,
      height:40,
      alignItems: "center",
      justifyContent: "center"
  },
  editProfileIcon:{
      color: "white",
      fontSize:20
  },
  topBarButton:{
    marginTop:13,
    borderWidth:0
  }
};
