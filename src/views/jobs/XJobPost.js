import React, {Component} from 'react';
import { View } from 'react-native';
import { Card } from "native-base";
import { connect } from "react-redux";
import {Text,Row, Column, Button, CustomButton, PostingTime, SimpleButton, T11, T12, T13, T14, Content, nav, Avatar, LinkButton} from 'src/components/'
import styles  from 'src/theme/sharedStyles/PostStyle'
import * as roles from 'src/components/c/Role'
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'
import * as Progress from 'react-native-progress';
import Details from 'src/views/jobs/post/Details'

import Post from 'src/views/jobs/post/JobPost'

 class JobPost extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null || this.props.lang != nextProps.lang){
      return true;
    }
     return nextProps.shouldUpdate
  }

  render() {
    var {data, applyBar, navigation, roleId, elemId} = this.props

    var match = data.match

    if(match > 100){
      match -= 100
    }


    return (
      <Post data={data} navigation={navigation}>
        <View  style={styles.postFooter}>
          <Progress.Circle showsText  progress={(match / 100)} size={45} formatText={() => ((match < 100 ? '  ' : '') + match + '% Match')} textStyle={{paddingLeft: 6}} color={match < 50 ? 'red': 'blue'}/>

          <CustomButton white text={I18n.t('jobs.post.details')}
           style={styles.button}  handler={() => nav(navigation, 'JobDetails', {data})}/>

         <CustomButton white text={I18n.t('jobs.post.save')}
           style={styles.button} handler={() => this.props.saveJob( data.id ) }/>

         {data.phone && (<CustomButton icon={"phone"} style={styles.button} handler={() =>  call({ number: data.phone})}/>)}

        </View>
      </Post>
    )
    } 
  }


    const mapStateToProps = ({globalReducer}) => ({
      roleId: globalReducer.profileInfo.roleId,
      lang: globalReducer.config.lang
    });
    export default connect(mapStateToProps, jobActions)(JobPost);
