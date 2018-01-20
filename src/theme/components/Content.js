import variable from "./../variables/platform";
const React = require("react-native");
const { Platform} = React;

export default (variables = variable) => {
  const contentTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: "white",
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "white"
    },
    marginBottom: Platform.OS === "ios" ? 0 : 40,
    ".fullscreen": {
      marginBottom: 0
    }
  };

  return contentTheme;
};
