

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {T13, Row} from 'src/components/'
 import {Text, View} from 'react-native';
 import { CardItem } from "native-base";

 const LIMIT = 300;

 export default class Content extends Component {

  constructor(props){
      super(props)
      this.state = {
        showFullText: false
       }
    }

    readMore(){
      this.setState({showFullText: true})
    }

    readLess(){
      this.setState({showFullText: false})
    }

  render() {
    var {text} = this.props,

    text = text || ''
    isLongText = text.length > LIMIT,
    splitText = isLongText &&  !this.state.showFullText;

    return (
      <View>
      {splitText ?
      (
        <T13>
         {text.substring(0, text.substring(LIMIT, text.length).indexOf(' ') + LIMIT) + '...' }
         <T13 style={{color: global.secondaryColor}} onPress={() => this.readMore()}>
          { ' See More' }
         </T13>
        </T13>
      )
      : (
        <T13 >
          {text}
          {isLongText && (<T13 style={{color: global.secondaryColor}} onPress={() => this.readLess()}>
           { ' See Less' }
          </T13>)}
        </T13>
      )}
      </View>
    );
  }
}
