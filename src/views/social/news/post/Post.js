import React, {Component} from 'react';
import {Image,View, StyleSheet,Dimensions, Platform, TouchableHighlight  } from 'react-native';
import { Text, thumbnail, Card,   CardItem, Left, Right, Body,  Item, Icon, Button} from "native-base";
import { NavigationActions } from "react-navigation";
import {ConnectButton, SimpleButton, PostingTime, Row, Column,T11, T12,T13, T14, Content} from 'src/components/'
import FAIcon from 'react-native-fa-icons';
import postStyle  from 'src/theme/sharedStyles/PostStyle'
const commonColor = require("src/theme/variables/commonColor");
import TopHeader from './parts/TopHeader'

const profileNavigateAction = userInfo =>
  NavigationActions.navigate({
    routeName: "Profile",
    params: { userInfo }
  });


export default class Post extends Component {


  shouldComponentUpdate(nextProps, nextState){
     return nextProps.shouldUpdate;
  }


  render() {
    var navigation = this.props.navigation;
    var dataRow = this.props.data;
    console.log('rendering ' + this.props.index)

    var {type, acttype} = dataRow;

    var authorPrefix;

    switch(type){
      case 1: authorPrefix = 'Group: '
        break
      case 2: authorPrefix = 'Company'
        break
    } 

    return (
    <Card style={postStyle.container}>
      {acttype > 1 && (<TopHeader/>)}
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => navigation.dispatch(profileNavigateAction(dataRow))}>
             <View>
              <Image source={{uri: dataRow.authorimage}}  style={postStyle.thumbnail}/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14 strong shortLine > {dataRow.author} </T14>
              <Text style={[postStyle.smallText, postStyle.subAuthorText]}
                onPress={()=>alert('go to this group')}
              >
                {authorPrefix && (<Text style={[postStyle.smallText, postStyle.strong]}>{authorPrefix}</Text>)}
                {dataRow.group}
              </Text>

            </View>
        </View>

        <View style={postStyle.headerRight} >
          <View style={{flexDirection: "row",justifyContent:'flex-end'}} >
            <Button light  style={{width:30, height:30, justifyContent:'center'}}>
              <FAIcon name='gear' style={postStyle.settingsIcon}/>
            </Button>
          </View>
          <PostingTime/>
        </View>
      </View>

      <T13 strong style={{marginBottom: 5}}> {dataRow.title} </T13>

      <View style={postStyle.centered}>
        <Image source={{uri: dataRow.imageX}} style={postStyle.postImage}/>
      </View>
      <Content text={dataRow.content}/>

      <Text style={[postStyle.smallText, {textAlign: 'right'}]}
        onPress={()=>alert('Open link')}>
        <Text style={[postStyle.smallText,{fontWeight: "bold"}]}>{'Source: '}</Text>
         {"http://google.com"}
      </Text>

      <Row h={30} spaceBetween >
      <T12 green style={postStyle.horizontalPadding20} onPress={()=> alert('See likes')}>{dataRow.likes + ' '}<FAIcon name='thumbs-up'  style={styles.smallIcon}/></T12>
      <T12 green style={postStyle.horizontalPadding20} onPress={()=> alert('See comments')}>{dataRow.comments + ' '}<FAIcon name='comments'  style={styles.smallIcon}/></T12>
      <T12 green style={postStyle.horizontalPadding20} onPress={()=> alert('See comments')}>{dataRow.shares + ' '}<FAIcon name='share'  style={styles.smallIcon}/></T12>
      </Row>

      <Row h={40} spaceBetween style={{borderTopWidth:0.2, borderTopColor: global.secondaryColor, marginHorizontal: 0}}>

        <Button small transparent style={{margin: 15}}>
          <Icon  name="ios-thumbs-up-outline" style={styles.cardFooterIcons} />
          <T13 strong light style={styles.cardFooterText}>LIKE</T13>
        </Button>
        <Button small transparent  style={{marginTop: 15}}>
          <Icon name="ios-chatboxes-outline" style={styles.cardFooterIcons} />
          <T12 strong light style={styles.cardFooterText}>COMMENT</T12>
        </Button>
        <Button small transparent  style={{margin: 15}}>
          <Icon name="ios-redo-outline" style={styles.cardFooterIcons} />
          <T12 strong light style={styles.cardFooterText}>SHARE</T12>
        </Button>

    </Row>
  </Card>)
    }


  }


  const styles = StyleSheet.create({
    cardFooterIcons: {
      fontSize: 20,
      color: commonColor.lightTextColor,
      marginBottom: 5
    },
    smallIcon:{
      fontSize: 14,
      color: global.secondaryColor,
      paddingLeft: 6
    },
    cardFooterText: {
      marginBottom: 10
    }
  });
