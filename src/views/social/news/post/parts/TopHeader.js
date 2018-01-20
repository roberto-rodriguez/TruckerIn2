import React, {Component} from 'react';
import { View, StyleSheet  } from 'react-native';
import { Text} from "native-base";
import {T12,T13, T14} from 'src/components/'

export default class TopHeader extends Component {

render(){
  var postInfo = {
    "author": "Julio Cesar",
    "authorid": 5,
    "author2": "Roberto Rodriguez",
  	"authorid2": 6,
  //  "others": 2,
    "acttype": 3
  }

  var others = postInfo.others;

  var activity, andText = '';

  if(others > 0){
    andText = ', ';
  }else{
    if(postInfo.authorid2){
        andText = ' and ';
    }
  }

switch(postInfo.acttype){
  case 2: activity = ' liked ';
    break;
  case 3: activity = ' commented ';
    break;
  case 4: activity = ' shared ';
    break;
}


return (
  <View style={styles.wrapper}>
      <Text>
        <T14 strong onPress={()=> alert('click julio')}>{postInfo.author}</T14>
        <T13>{andText}</T13>
        {
          postInfo.author && (<T14 strong onPress={()=> alert('click rober')}>{postInfo.author2}</T14>)
        }
        {
          others && (
            <Text>
              <T13>{' and '}</T13>
              <T14 strong>{others}</T14>
              <T13>{' others '}</T13>
            </Text>
          )
        }
        <T13>{activity + ' this'}</T13>
      </Text>
    </View>
)

}
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection: 'row',
  //  padding:10,
    borderBottomWidth:0.2,
    marginBottom:15
  //  borderBottomColor: global.secondaryColor
  }
})
