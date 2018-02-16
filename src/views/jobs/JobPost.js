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
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null || this.props.lang != nextProps.lang){
      return true;
    }
     return nextProps.shouldUpdate
  }

  render() {
    var {data, applyBar, navigation, roleId} = this.props

    var authorPrefix = '';

    return (
    <Card style={postStyle.container}>
      <View style={postStyle.headline}>
        <T14 strong style={{color:'#0B3A42'}}>Ozark Motor Lines is now offering hourly pay for our intermodal drivers!, Ozark Motor Lines is now offering hourly pay for our intermodal</T14>
      </View>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation,  "Profile", {userInfo:data} )}>
             <View>
                <Avatar name={data.userName}  size={60} src={data.profileImg} square/>
            </View>
            </SimpleButton>
            <View note style={{ flexDirection: "column", marginLeft: 10}}>
              <T14  shortLine style={{color:'black', width: 150}}> {data.userName} </T14>
              <T12 light shortLine>{data.authorRole}</T12>
              <T12 light shortLine>{data.locationName} </T12>

            </View>
        </View>

        <View style={postStyle.headerRight} >
          <View style={styles.applyView} >
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


      <Content text={data.description} style={{marginTop: 10}}/>
      {
        applyBar && (
          <Row h={30} spaceBetween style={{marginTop: 10}}>

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

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70, marginRight:10},
      applyView: {flexDirection: "row",justifyContent:'flex-end'}
    })

    const mapStateToProps = ({globalReducer}) => ({
      roleId: globalReducer.profileInfo.roleId,
      lang: globalReducer.config.lang
    });
    export default connect(mapStateToProps, jobActions)(JobPost);
