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

  render() {
    var {data, applyBar, navigation, roleId} = this.props

    var authorPrefix = '';

    return (
    <Card style={postStyle.container}>
      <View style={postStyle.headline}>
        <T14 style={{color:'#0B3A42'}}>Ozark Motor Lines is now offering hourly pay for our intermodal drivers!, Ozark Motor Lines is now offering hourly pay for our intermodal</T14>
      </View>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation,  "Profile", {userInfo:data} )}>
             <View>
                <Avatar name={data.userName}  size={60} src={data.profileImg} square/>
            </View>
            </SimpleButton>
            <View style={{ flexDirection: "column", marginLeft: 10}}>
              <T13  shortLine style={{color:'black', width: 160}}> {'Ozark Motor Lines'} </T13>
              <T12 light shortLine>{'Job Locations:'}</T12>
            <T12 style={{width: 160}}>{'California • Georgia  • Texas • Florida'} </T12>

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

      <Text style={{color: '#629aa9'}}><Text >{I18n.t('jobs.post.equipment')}</Text>{'Tractor • Dump Truck • Flat Bed • Tanker • Dump Truck • Flat Bed • Tanker'}</Text>
      <Text style={{color: '#629aa9'}}><Text >{'Minima Experiencia Requerida: '}</Text>{'2 Years'}</Text>
      <Text style={{color: '#629aa9'}}><Text >{'Category: '}</Text>{'Company Driver'}</Text>
    <Text style={{color: '#629aa9'}}><Text >{'Distance: '}</Text>{'On the Road'}</Text>
      <Text style={{color: '#629aa9'}}><Text >{I18n.t('jobs.post.compensation')}</Text>{data.compensation}</Text>


      <Content text={data.description} style={{marginTop: 10}}/>
      {
        applyBar && (
          <Row h={46} spaceBetween style={{marginTop: 10}}>

            <CustomButton white text={I18n.t('jobs.post.details')}
             style={styles.button}
             handler={() => nav(navigation, 'JobDetails', {data})}/>

           <Progress.Circle showsText  progress={0.4} size={45} formatText={this.formatText} textStyle={{paddingLeft: 6}} color={'red'}/>

           <CustomButton white text={I18n.t('jobs.post.save')}
             style={styles.button}
             handler={() => this.props.saveJob( data.id ) }/>
          </Row>
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
      button: {width:70, marginRight:10},
      applyView: {flexDirection: "row",justifyContent:'flex-end'}
    })

    const mapStateToProps = ({globalReducer}) => ({
      roleId: globalReducer.profileInfo.roleId,
      lang: globalReducer.config.lang
    });
    export default connect(mapStateToProps, jobActions)(JobPost);
