
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import {Text,Row,  Button, CustomButton, PostingTime, SimpleButton, T10, T11, T12, T13, T14, Content, nav, Avatar} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import moment from 'moment';
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";


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

  answer = () => nav(this.props.navigation, 'TextInputView', {title:'Answer to Employer', text:'', callback: this.onAnswer})

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

//TODO put this in a util class
  _formatDate(dateStr){
    return moment(dateStr,'YYYYMMDDTHH:mm:ss').format("MMM Do");
  }

  _formatTime(dateStr){
    return moment(dateStr,'YYYYMMDDTHH:mm:ss').format('LT');
  }


  render() {
    var  job = this.state// this.props.data;
    const navigation = this.props.navigation;

    if(job.discarded)return null;

    return (

    <Card style={postStyle.container}>
      <View style={styles.header}>
          <T12 green shortLine>{'Application submitted on Nov 28, 2017 at 3:35 PM'}</T12>
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
              <T12 light shortLine>{job.location} </T12>
              <T12 light shortLine>{job.authorRole}</T12>
            </View>
        </View>

        <View style={postStyle.headerRight} >

          <PostingTime/>
        </View>
      </View>

      <Text><Text strong>Equipment: </Text>{job.equipment}</Text>
      <Text><Text strong>Required Experience: </Text>{job.experience}</Text>
      <Text><Text strong>Compensation: </Text>{job.compensation}</Text>

      <Row h={30} style={{marginTop: 10}}>

          <CustomButton white text={'DETALLES'}
          style={styles.button}
          handler={() => nav(navigation, 'JobDetails', {data: job}) }/>

         <CustomButton white text={'DISCARD'}
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
        actionsCmp.push(<T12 key={job.id} light>{"Application not seen yet."}</T12>)
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
             {this._formatDate(action.date)} </T12>
             {': ' + action.text}

             <T10 light>
              {'   (' + this._formatTime(action.date) + ')'}
             </T10>
          </T12>))

          if(appActions[appActions.length -1].request){
            actionsCmp.push(
              <CustomButton white text={'RESPONDER'}  key={'button-' + job.id}
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
