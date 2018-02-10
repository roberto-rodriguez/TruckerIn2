
import React, { Component } from 'react'

import { StyleSheet, View } from 'react-native';
import { Thumbnail} from "native-base";
import { T15 } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";

const agentImg = require("../../../assets/contacts/agent.jpg");


export default class AgentImg  extends Component {
  render() {
    var {text, red, size, text2} = this.props

      var w = 120, h = 120, borderRadius=60
      if(size){
        w = size
        h = size
        borderRadius = size / 2
      }

      return (
          <View style={styles.container}>
            <Thumbnail source={agentImg} style={styles.thumbnail} width={w} height={h} borderRadius={borderRadius}/>
            {text && <T15 green red={red} style={styles.text}>{text}</T15>}
            {text2 && <T15 green red={red} style={styles.text}>{text2}</T15>}
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:30,
      marginBottom:10
    },
    thumbnail: {
      borderWidth:0.2,
      borderColor:theme.secondaryColor,
      margin: 20
    }
    })
