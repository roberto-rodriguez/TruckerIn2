import ReactNative from 'react-native';

const commonColor = require("src/theme/variables/commonColor");
import theme from 'src/theme/variables/platform'

export default  ReactNative.StyleSheet.create({
  text:{
    color:'#697080', //'black',//  commonColor.contentTextColor, //
    lineHeight: ReactNative.Platform.OS === "ios" ? 20 : 22,
    textAlign: 'left'
  },
  strong: {
    fontWeight: "bold",
  },
  light:{
    color: commonColor.lightTextColor
  },
  shortLine:{
    lineHeight: ReactNative.Platform.OS === "ios" ? 16 : 18
  },
  color:{
    color: theme.secondaryColor
  },
  red:{
    color: 'red'
  }
})
