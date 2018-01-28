
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import {  Card } from "native-base";
import {Text,Row,  CustomButton, PostingTime, SimpleButton, T11,T12, T13, T14,  nav, Avatar} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import I18n from 'react-native-i18n'
export default class SavedJobPost extends Component {

  render() {
    var dataRow = this.props.data;
    const navigation = this.props.navigation;

    return (
    <Card style={postStyle.container}>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => nav(navigation, 'Profile', {userInfo: dataRow} )}>
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
            <CustomButton text={I18n.t('jobs.post.apply')} style={{width:60}}
             handler={() => nav(navigation, 'JobApp', {jobId: dataRow.id}) }/>
          </View>
          <PostingTime date={dataRow.createdAt}/> 
        </View>
      </View>

      <Text><Text strong>{I18n.t('jobs.post.equipment')}</Text>{dataRow.equipment}</Text>
      <Text><Text strong>{I18n.t('jobs.post.exp')}</Text>{dataRow.experience}</Text>
      <Text><Text strong>{I18n.t('jobs.post.compensation')}</Text>{dataRow.compensation}</Text>

      {
          <Row h={30} style={{marginTop: 10}}>

              <CustomButton white text={I18n.t('jobs.post.details')}
              style={styles.button}
              handler={() => navigation.navigate('JobDetails')}/>

             <CustomButton white text={I18n.t('jobs.post.discard')}
               style={styles.button}
               handler={() => {}}/>
          </Row>
      }
    </Card>)
    }

  }

  const styles = StyleSheet.create({
      thumbnail: {
        height: 50,
        width: 50
      },
      button: {width:70, marginRight:10}
    })
