
import React, {Component} from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Card } from "native-base";
import {Text,Row,Column,  Button, CustomButton, PostingTime, SimpleButton, T10, T12, T14, Content, Avatar, nav, formatDate, SendMsg} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import moment from 'moment';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'
import theme from 'src/theme/variables/platform';
import Icon from 'react-native-fa-icons';

 class JobApplicationPost extends Component {

  constructor(props) {
      super(props)

      this.state = {
        deleted: false,
        data: props.data,
        msg: ''
      }
}

 delete = () => this.setState({deleted: true})

 //sendMessage = () => nav(navigation, 'TextInputView', {title: I18n.t('jobs.app.msgToApplicant'), callback:this.onSendMessage})

 onSendMessage = () => {
   var _this = this

   var msg = this.state.msg

   if(!msg)return;

   var action = {
     fromEmployer: true,
     description: this.state.msg,
     appId: this.props.data.id
   }


   this.props.sendMsgJobApp(action, ( id ) => {

     action.createdAt = (new Date()).getTime()

     _this.setState(prevState => {
       prevState.data.appActions = [...(prevState.data.appActions || []), action]
       prevState.msg = ''
       return prevState
     })
   })
 }

  render() {
    var dataRow = this.state.data;
    const navigation = this.props.navigation;

    if(this.state.deleted)return null;

    return (
      <View>
     <Card style={postStyle.container}>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation, 'Profile', {userInfo: dataRow})}>
             <View>
              <Avatar name={dataRow.userName}  size={60} src={dataRow.profileImg} square/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14 strong shortLine style={{color:'black'}}> {dataRow.userName} </T14>
              <T12 light shortLine>{dataRow.locationName} </T12>
              <T12 light shortLine>{dataRow.authorRole}</T12>
            </View>
        </View>

        <View style={postStyle.headerRight} >
          <View style={{flexDirection: "row",justifyContent:'flex-end'}} >
            <CustomButton text={'CALL'} style={{width:60}}
            handler={() => alert('Calling ' + dataRow.applicantPhone)}/>
          </View>
          <PostingTime date={dataRow.appTime} text={I18n.t('jobs.app.applied')}/>
        </View>
      </View>

      <Text><Text strong>{I18n.t('jobs.post.ex')} </Text>{dataRow.experience}</Text>
      <Text><Text strong>{I18n.t('jobs.post.equipment')} </Text>{dataRow.equipment}</Text>


      <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-between'}}>

        <CustomButton  text={I18n.t('jobs.post.completeProfile')}
          style={[styles.button, { width:140}]}
          handler={() => nav(navigation, 'Profile', {userInfo: dataRow})}/>

        <CustomButton white text={I18n.t('jobs.post.jobDetails')}
          style={[styles.button, { width:100}]}
          handler={() => navigation.navigate('JobDetails')}/>

         <CustomButton white text={I18n.t('jobs.post.reject')}
           style={styles.button}
           handler={() => {}}/>
      </View>

      {
        dataRow.appActions && dataRow.appActions.length > 0 &&
         (  <View style={styles.footer}>
              {this.buildActions()}
            </View> )
      }

      <SendMsg
        onChangeText={(msg) => this.setState({msg})}
         onSendMessage={this.onSendMessage}/>
    </Card>


  </View>
  )
    }


    buildActions = () => {
      var job = this.state.data

      var appActions = job.appActions || [];
      var actionsCmp = appActions.map((action, i) => (
          <T12 key={job.id + '-' + action.id}
           light
           red={action.request &&  i ===  appActions.length - 1}
           green={action.anfromEmployerswer}>
            <T12
             strong
             light
             red={action.request &&  i ===  appActions.length - 1}
             green={action.fromEmployer}>
             { formatDate(action.createdAt, 'MMM Do')} </T12>
             {': ' + action.description}

             <T10 light>
              {'   (' + formatDate(action.createdAt, 'h:mm a') + ')'}
             </T10>
          </T12>))
      return actionsCmp
    }


  }

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70},
      footer: {
        flexDirection: 'column',
        borderTopWidth:0.2,
        marginTop:15,
        paddingTop:10,
      },
      // input:{
      //   width: '100%'
      // },
      // sendButton:{
      //   width:'100%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10
      // },
      // sendButtonWrap: {
      //   backgroundColor: theme.secondaryColor, borderTopRightRadius: 10, borderBottomRightRadius: 10
      // },
      // sendIconWrap:{alignItems:'center', marginTop: 10},
      // messageText: {borderWidth: 0.5, borderColor: theme.secondaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
      // msgWrap: {flexDirection: 'row', marginTop: 10}
    })

    const mapStateToProps = ({  globalReducer}) => {
      var profileInfo = globalReducer.profileInfo

      return {
        profileImg: profileInfo.profileImg,
        fullName: profileInfo.firstName + ' ' + profileInfo.lastName
      }
    }

    export default connect(mapStateToProps, jobActions)(JobApplicationPost);
