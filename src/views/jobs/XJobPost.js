import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import { connect } from "react-redux";
import {Text,Row,  Button, CustomButton, PostingTime, SimpleButton, T12, T13, T14, Content, nav, Avatar} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import * as roles from 'src/components/c/Role'
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'
import * as Progress from 'react-native-progress';

 class JobPost extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null || this.props.lang != nextProps.lang){
      return true;
    }
     return nextProps.shouldUpdate
  }

  // <Text style={{color: '#629aa9'}}><Text >{I18n.t('jobs.post.compensation')}</Text>{data.compensation}</Text>
  // <Content text={data.description} style={{marginTop: 10}}/>

  render() {
    var {data, applyBar, navigation, roleId, elemId} = this.props

    var match = data.match

    if(match > 100){
      match -= 100
    }

    console.log('Rendering ' + elemId)

    return (
    <Card style={postStyle.container}>
      <View style={postStyle.headline}>
        <T14 stron style={{color:'#0B3A42'}}>{data.title}</T14>
      </View>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation,  "Profile", {userInfo: data} )}>
             <View>
                <Avatar name={data.userName}  size={60} src={data.profileImg} square/>
            </View>
            </SimpleButton>
            <View style={{ flexDirection: "column", marginLeft: 10}}>
              <T13 shortLine style={{color:'black', width: 160}}>{data.userName} </T13>
              <T12 shortLine green ><T12 shortLine>{I18n.t('jobs.post.category')}</T12>{data.category}</T12>
              <T12 shortLine green ><T12 shortLine>{I18n.t('jobs.post.distance')}</T12>{data.distance}</T12>
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
      <T12 green ><T12>{I18n.t('jobs.post.equipment')}</T12>{data.equipments}</T12>
      <T12 green ><T12>{I18n.t('jobs.post.minExp')}</T12>{data.experience}</T12>
      <T12 green ><T12>{I18n.t('jobs.post.locations')} </T12>{data.states}</T12>
      {
        applyBar && (
          <View  style={{marginTop: 10, height: 45, flexDirection: 'row', justifyContent: 'space-between'}}>

            <Progress.Circle showsText  progress={(match / 100)} size={45} formatText={() => ((match < 100 ? '  ' : '') + match + '% Match')} textStyle={{paddingLeft: 6}} color={match < 50 ? 'red': 'blue'}/>


            <CustomButton white text={I18n.t('jobs.post.details')}
             style={styles.button}  handler={() => nav(navigation, 'JobDetails', {data})}/>

           <CustomButton white text={I18n.t('jobs.post.save')}
             style={styles.button} handler={() => this.props.saveJob( data.id ) }/>

           {data.phone && (<CustomButton icon={"phone"} style={styles.button} handler={() =>  call({ number: data.phone})}/>)}

          </View>
        )
      }
    </Card>)
    }

    formatText = (progress) => ('40% Match')

  }

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70, marginTop:10},
      applyView: {flexDirection: "row",justifyContent:'flex-end'}
    })

    const mapStateToProps = ({globalReducer}) => ({
      roleId: globalReducer.profileInfo.roleId,
      lang: globalReducer.config.lang
    });
    export default connect(mapStateToProps, jobActions)(JobPost);
