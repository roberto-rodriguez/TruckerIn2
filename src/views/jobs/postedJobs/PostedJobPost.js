
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import {Text,Row,  Button, CustomButton, PostingTime, SimpleButton,  T12, T14, Content, Avatar, nav} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

 class PostedJobPosts extends Component {

  constructor(props) {
      super(props)

      this.state = {
        deleted: false
      }
}

 delete = () => this.setState({deleted: true})

  render() {
    var dataRow = this.props.data;
    const {navigation, isMe} = this.props

    if(this.state.deleted)return null;

    return (
     <Card style={postStyle.container}>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation, 'Profile', {userInfo:dataRow})}>
             <View>
              <Avatar name={dataRow.userName}  size={60} src={dataRow.profileImg} square/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14 strong shortLine style={{color:'black'}}> {dataRow.userName} </T14>
              <T12 light shortLine>{dataRow.location} </T12>
              <T12 light shortLine>{dataRow.authorRole}</T12>
            </View>
        </View>

        <View style={postStyle.headerRight} >
          <View style={{flexDirection: "row",justifyContent:'flex-end'}} >
            {  isMe && (
              <CustomButton text={'EDIT'} style={{width:60}}
              handler={() => nav(navigation, 'CreateJob', {jobId: dataRow.id, action: 'edit'}) }/>
            )}
          </View>
          <PostingTime/>
        </View>
      </View>

      <Text><Text strong>{I18n.t('jobs.post.equipment')}</Text>{dataRow.equipment}</Text>
      <Text><Text strong>{I18n.t('jobs.post.exp')}</Text>{dataRow.experience}</Text>
      <Text><Text strong>{I18n.t('jobs.post.compensation')}</Text>{dataRow.compensation}</Text>

    <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-between' }}>
        {isMe && (
            <CustomButton text={dataRow.apps + I18n.t('jobs.posted.app')} style={{height:32, width:100}}
            handler={() => nav(navigation, 'PostedJobApplications', {jobId: dataRow.id})}/>
          )
        }

          <CustomButton white text={I18n.t('jobs.post.details')}
          style={styles.button}
          handler={() => nav(navigation, 'JobDetails', {data: dataRow})}/>

          {isMe && (
            <CustomButton white text={I18n.t('jobs.post.copy')}
              style={styles.button}
              handler={() => nav(navigation, 'CreateJob', {jobId: dataRow.id, action: 'copy'}) }/>
            )
          }

          {isMe && (
            <CustomButton white icon={'trash'} style={{width: 40}}
              handler={ this.delete }/>
            )
          }
      </View>

    </Card>)
    }

  }

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70}
    })

    const mapStateToProps = ({ globalReducer}, ownProps) =>  ({
       isMe: ownProps.data && ownProps.data.userId === globalReducer.profileInfo.id
    })

    export default connect(mapStateToProps)(PostedJobPosts);
