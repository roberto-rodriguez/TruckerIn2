

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
const commonColor = require("src/theme/variables/commonColor");
import theme from 'src/theme/variables/platform'

 class Text extends Component {

  render() {
    var { strong, style} = this.props;

    var textStyle = [styles.text, style];

    if(strong){
      textStyle.push(styles.strong);
    }

    return (
      <ReactNative.Text style={textStyle}>
        {this.props.children}
      </ReactNative.Text>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  strong: {
    fontWeight: "bold",
  },
  text:{
    color: commonColor.contentTextColor,
    lineHeight: ReactNative.Platform.OS === "ios" ? 20 : 22,
    fontSize: 13 
  }
})

export default Text;
