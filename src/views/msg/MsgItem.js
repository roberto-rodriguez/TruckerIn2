import React, { Component } from "react";
import { View } from "react-native";
import { Content, Left, Body, ListItem } from "native-base";
import { T10, T13, T14, nav, Avatar} from 'src/components/'

class MsgItem extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
      return true;
    }
     return nextProps.shouldUpdate
  }

  render() {
    const {navigation, dataRow} = this.props

    return (
          <ListItem button thumbnail white={dataRow.seen} style={{marginLeft:0}}
            onPress={() => nav(navigation, 'Chat', {name: dataRow.userName, convId: dataRow.id, id: dataRow.userId}) } >
            <Left>
              <Avatar name={dataRow.userName} src={dataRow.userImg} style={{marginLeft:5}}/>
            </Left>
            <Body style={{marginRight:10}}>
              <View style={{height:30, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <T14>
                    {dataRow.userName}
                  </T14>
                   <T10 light shortLine>
                    {dataRow.time}
                  </T10>
              </View>

              <T13 light shortLine>
                {dataRow.lastMsg}
              </T13>
            </Body>

          </ListItem>
    )

  }
}

export default MsgItem;
