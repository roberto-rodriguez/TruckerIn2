
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet'
import I18n from 'react-native-i18n'
const commonColor = require("src/theme/variables/commonColor");
//secondaryColor
 export default class Select extends Component {

   show(){
     this.ActionSheet.show();
   }

  render() {
    var {options, onPress} = this.props;

    return (
      <ActionSheet
         ref={o => this.ActionSheet = o}
         options={[{I18n.t('cmp.widgets.cancel')},  ...options.map(op => (op.name))]}
         tintColor={commonColor.secondaryColor}
         cancelButtonIndex={0}
         onPress={(i) => {i > 0 && this.props.onPress(i - 1)}}
       />
    );
  }
}
