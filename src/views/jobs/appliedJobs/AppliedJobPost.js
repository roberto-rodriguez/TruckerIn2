
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import {Text,Row,  SendMsg, CustomButton, SimpleButton, T10, PostingTime, T12,  T14,  nav, Avatar, formatDate} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import moment from 'moment';
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";
import I18n from 'react-native-i18n'



 class AppliedJobPost extends Component {

   constructor(props){
     super(props)
     this.state = {
       discarded: false,
       data: props.data
     }
   }

   shouldComponentUpdate(nextProps, nextState){
     if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
       return true;
     }
      return nextProps.shouldUpdate
   }

   onSendMessage = (description) => {
     var _this = this

     if(!description)return;

     var action = {
       fromEmployer: false,
       description,
       appId: this.props.data.id
     }


     this.props.sendMsgJobApp(action, ( id ) => {

       action.createdAt = (new Date()).getTime()

       _this.setState(prevState => {
         prevState.data.appActions = [...(prevState.data.appActions || []), action]
         return prevState
       })
     })
   }

  onDiscard = () => this.props.discardApp(this.state.data.id, () => this.setState({discarded: true}))

  render() {
    var job = this.state.data;
    const navigation = this.props.navigation;

    if(this.state.discarded)return null;

    return (

    <Card style={postStyle.container}>
      <View style={styles.header}>
          <T12 green shortLine>{I18n.t('jobs.applied.appSubmittedOn') + formatDate(job.appTime, 'LL')}</T12>
      </View>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation, 'Profile', { userInfo: job })}>
             <View>
                <Avatar name={job.userName}  size={60} src={job.profileImg} square/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14 strong shortLine style={{color:'black'}}> {job.userName} </T14>
            <T12 light shortLine>{job.locationName} </T12>
              <T12 light shortLine>{job.authorRole}</T12>
            </View>
        </View>
        <PostingTime date={job.createdAt}/>
      </View>

      <Text><Text strong>{I18n.t('jobs.post.equipment')}</Text>{job.equipment}</Text>
      <Text><Text strong>{I18n.t('jobs.post.exp')}</Text>{job.experience}</Text>
      <Text><Text strong>{I18n.t('jobs.post.compensation')}</Text>{job.compensation}</Text>

    <Row h={30} spaceBetween style={{marginTop: 10}}>

          <CustomButton white text={I18n.t('jobs.post.details')}
          style={styles.button}
          handler={() => nav(navigation, 'JobDetails', {data: {...job, id: job.jobId}}) }/>

        <CustomButton white small icon={'trash'}
           handler={this.onDiscard}/>

      </Row>


      <View style={styles.footer}>
        {this.buildActions()}
      </View>
    </Card>)
    }

    buildActions = () => {
      var job = this.state.data
      if(!job.appActions)return;
      var appActions = job.appActions || [];
      var actionsCmp = []


        actionsCmp = appActions.map((action, i) => (
          <T12 key={action.id + '-' + action.createdAt}
           light
           green={action.fromEmployer}>
            <T12
             strong
             light
             green={action.fromEmployer}>
             {action.createdAt ? (formatDate(action.createdAt, 'MMM Do') + ': ') : '' } </T12>
             {action.description}

             <T10 light>
                {action.createdAt ? ('   (' + formatDate(action.createdAt, 'h:mm a') + ')') : ''}
             </T10>
          </T12>))

          if(!job.rejected && !job.deleted && appActions[appActions.length -1].fromEmployer){
            actionsCmp.push(
              <SendMsg onSendMessage={this.onSendMessage} key={999} placeholder={I18n.t('jobs.applied.answerToEmployer')}/>
             )
          }
      return actionsCmp
    }

  }

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {
        width:75,
        marginRight:10
      },
      header: {
          flexDirection: 'row',
          borderBottomWidth:0.2,
          marginBottom:15,
          paddingBottom:10,
        },
      footer: {
          flexDirection: 'column',
          borderTopWidth:0.2,
          marginTop:15,
          paddingTop:10,
        }
    })

    export default connect(null, jobActions)(AppliedJobPost);
