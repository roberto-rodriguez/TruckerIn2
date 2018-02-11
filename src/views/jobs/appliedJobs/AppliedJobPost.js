
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import {Text,Row,  Button, CustomButton, SimpleButton, T10, PostingTime, T12,  T14,  nav, Avatar, formatDate} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import moment from 'moment';
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

 class AppliedJobPost extends Component {

   constructor(props){
     super(props)
     this.state = {
     }
   }

   shouldComponentUpdate(nextProps, nextState){
     if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
       return true;
     }
      return nextProps.shouldUpdate
   }

   componentWillMount ( ){
     this.setState(this.props.data)
   }

  answer = () => nav(this.props.navigation, 'TextInputView', {title:I18n.t('jobs.applied.answerToEmployer'), text:'', callback: this.onAnswer})

  onDiscard = () => this.setState({...this.state, discarded: true})

  onAnswer = (answer) => {
    var job = this.props.data;
    this.props.answerJobApp(job , answer, (newAction) => {

       this.setState((prevState) => {
         var appActions = prevState.appActions || []
         appActions.push(newAction)

         return {
           ...prevState,
           appActions
         }
       })
    })
  }

  render() {
    var  job = this.state// this.props.data;
    const navigation = this.props.navigation;

    if(job.discarded)return null;

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

      <Row h={30} style={{marginTop: 10}}>

          <CustomButton white text={I18n.t('jobs.post.details')}
          style={styles.button}
          handler={() => nav(navigation, 'JobDetails', {data: job}) }/>

         <CustomButton white text={I18n.t('jobs.post.discard')}
           style={styles.button}
           handler={() => this.props.discardJob(job.id, this.onDiscard)}/>

      </Row>


      <View style={styles.footer}>
        {this.buildActions()}
      </View>
    </Card>)
    }

    buildActions = () => {
      var job = this.state

      var appActions = job.appActions || [];
      var actionsCmp = []

      if(appActions.length === 0){
        actionsCmp.push(<T12 key={job.id} light>{I18n.t('jobs.applied.notSeen')}</T12>)
      }else{
        actionsCmp = appActions.map((action, i) => (
          <T12 key={job.id + '-' + action.id}
           light
           red={action.request &&  i ===  appActions.length - 1}
           green={action.answer}>
            <T12
             strong
             light
             red={action.request &&  i ===  appActions.length - 1}
             green={action.answer}>
             { formatDate(action.createdAt, 'MMM Do')} </T12>
             {': ' + action.text}

             <T10 light>
              {'   (' + formatDate(action.createdAt, 'LT') + ')'}
             </T10>
          </T12>))

          if(appActions[appActions.length -1].request){
            actionsCmp.push(
              <CustomButton white text={I18n.t('jobs.applied.answer')}  key={'button-' + job.id}
                 style={[styles.button, {marginTop: 5}]}
                 handler={this.answer}/>
             )
          }
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
