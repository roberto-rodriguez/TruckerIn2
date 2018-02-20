/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet} from 'react-native';
import {Row, Column,T14,T12, T13, nav } from 'src/components/'
import Icon from 'react-native-fa-icons';

 export default class ListItem extends Component {

  render() {
    var {icon, label, value, navigation, routeName, params, handler, borderTop, red} = this.props;

    var action = handler ? handler : () => nav(navigation, routeName || 'TextInputView', params)

      var borderStyle = {borderBottomWidth:0.5, borderColor: global.secondaryColor}

      if(borderTop){
        borderStyle['borderTopWidth'] = 0.3
      }

    return (
      <TouchableHighlight  underlayColor={'transparent'}  onPress={action}>
       <View>
         <Row h={60}  style={borderStyle}>
           <Column  h={60}  columns={7}  >
             <Icon name={icon} style={styles.icon}/>
           </Column>
           <Column h={60}  columns={7} colspan={5} style={{alignItems:'flex-start'}}>
             {borderTop ?
                (<T14 red={red}>{value}</T14>)
                :
                (
                  <View>
                    {label && <T12 light  red={red}>{label}</T12>}
                    <T13  red={red}>{value && (value.length < 30 ? value : (value + '').substring(0, 30) + '...')}</T13>
                  </View>
                )
              }
           </Column>
           <Column  h={60}  columns={7}  >
             <Icon name={'angle-right'}  style={styles.icon}/>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    );
  }
}



const styles = StyleSheet.create({
    icon: {
      fontSize: 18
    }
  })
