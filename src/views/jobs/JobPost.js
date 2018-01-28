import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import { connect } from "react-redux";
import {Text,Row,  Button, CustomButton, PostingTime, SimpleButton, T12, T13, T14, Content, nav, Avatar} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import * as roles from 'src/components/c/Role'
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'


 class JobPost extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null){
      return true;
    }
     return nextProps.shouldUpdate
  }

  render() {
    var {data, applyBar, navigation, roleId} = this.props

    var authorPrefix = '';

    return (
    <Card style={postStyle.container}>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation,  "Profile", {userInfo:data} )}>
             <View>
                <Avatar name={data.userName}  size={60} src={data.profileImg} square/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14 strong shortLine style={{color:'black'}}> {data.userName} </T14>
              <T12 light shortLine>{data.location} </T12>
              <T12 light shortLine>{data.authorRole}</T12>
            </View>
        </View>

        <View style={postStyle.headerRight} >
          <View style={{flexDirection: "row",justifyContent:'flex-end'}} >
            {roleId === roles.DRIVER &&
              <CustomButton text={I18n.t('jobs.post.apply')} style={{width:60}}
               handler={() => nav(navigation, 'JobApp', {jobId: data.id}) }/>
             }
          </View>
          <PostingTime date={data.createdAt}/>
        </View>
      </View>

      <Text><Text strong>{I18n.t('jobs.post.equipment')}</Text>{data.equipment}</Text>
      <Text><Text strong>{I18n.t('jobs.post.exp')}</Text>{data.experience}</Text>
      <Text><Text strong>{I18n.t('jobs.post.compensation')}</Text>{data.compensation}</Text>


      <Content text={data.desc} style={{marginTop: 10}}/>
      {
        applyBar && (
          <Row h={30} style={{marginTop: 10}}>

            <CustomButton white text={I18n.t('jobs.post.details')}
             style={styles.button}
             handler={() => nav(navigation, 'JobDetails', {data})}/>

           <CustomButton white text={I18n.t('jobs.post.save')}
             style={styles.button}
             handler={() => this.props.saveJob( data.id ) }/>
          </Row>
        )
      }
    </Card>)
    }

  }

        // <CustomButton white text={'SUGERIR A UN AMIGO'}
        //  style={[styles.button, {width:135}]}
        //  handler={() => {}}/>

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70, marginRight:10}
    })

    const mapStateToProps = ({globalReducer}) => ({
      roleId: globalReducer.profileInfo.roleId
    });
    export default connect(mapStateToProps, jobActions)(JobPost);
