/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Row} from 'src/components/'
import Icon from 'react-native-fa-icons'; 

 class BulletsView extends Component {

  render() {
    var {list, color} = this.props;
    return (
      <View style={{height:300, width:'100%'}}>
       {list.map((item, i) => (<Bullet  key={i} text={item}/>))}
      </View>
    );
  }
}

class Bullet extends Component {
 render() {
   return (
     <Row >
       <Icon name='check' style={styles.icon}/>
       <Text style={styles.text}>
        {this.props.text}
       </Text>
     </Row>
   );
 }
}

const styles = StyleSheet.create({
  icon: {
    color: global.secondaryColor,
    margin:5
  },
  text:{
    paddingRight:24
  }
})

export default BulletsView;
