import React, { Component } from "react";
import { View } from "react-native";
import { Content, Left, Body, ListItem } from "native-base";
import { T10, T13, T14, Row, RowColumn, nav, formatDate, Avatar} from 'src/components/'



class NotificationItem extends Component {

     constructor(props){
       super(props)
       this.state = {
         seen: false
       }
     }

     componentDidMount(){
       const {data} = this.props

       this.setState({
          seen: data.seen
       })
     }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
      return true;
    }

    if(this.state.seen != nextState.seen){
      return true;
    }
     return nextProps.shouldUpdate
  }

  clickNotification = () =>{
    const {navigation, data} = this.props

    this.setState({
       seen: true
    })

    if(data.params){
      try{
        var params = JSON.parse( data.params )

        nav(navigation, data.route, params)
      }catch(e){ }
    }else{
      nav(navigation, data.route)
    }

  }


  render() {
    const {navigation, data} = this.props

    return (
          <ListItem button thumbnail white={this.state.seen}
            style={{ marginLeft:0, paddingLeft: 10}}
            onPress={this.clickNotification} >
            <Left>
              <Avatar name={data.userName} src={data.userImg}/>
            </Left>
            <Body style={{marginRight:10}}>
              <RowColumn h={20} end style={{marginBottom:10}}>
                <T10 light shortLine>
                 {formatDate(data.createdAt)}
               </T10>
              </RowColumn>

              <T13 light shortLine>
                {data.text}
              </T13>
            </Body>

          </ListItem>
    )

  }
}

export default NotificationItem;
