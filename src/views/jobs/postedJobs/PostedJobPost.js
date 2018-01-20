
import React, {Component} from 'react';
import {Image,View, StyleSheet, TouchableHighlight  } from 'react-native';
import { Card, CardItem, Left, Right,   Item  } from "native-base";
import { NavigationActions } from "react-navigation";
import {Text,Row,  Button, CustomButton, PostingTime, SimpleButton, T11, T12, T13, T14, Content, Avatar} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'

const profileNavigateAction = userInfo =>
  NavigationActions.navigate({
    routeName: "Profile",
    params: { userInfo }
  });

  const createJobNavigateAction = (jobId, action) =>
    NavigationActions.navigate({
      routeName: "CreateJob",
      params: { jobId, action }
    });

  const postedJobApplicationsAction = jobId =>
    NavigationActions.navigate({
      routeName: "PostedJobApplications",
      params: { jobId }
    });

export default class PostedJobPosts extends Component {

  constructor(props) {
      super(props)

      this.state = {
        deleted: false
      }
}

 delete = () => this.setState({deleted: true})

  render() {
    var dataRow = this.props.data;
    const navigation = this.props.navigation;

    if(this.state.deleted)return null;

    return (
     <Card style={postStyle.container}>
      <View style={postStyle.header}>
        <View style={postStyle.headerLeft} >
            <SimpleButton onPress={() => navigation.dispatch(profileNavigateAction(dataRow))}>
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
            <CustomButton text={'EDIT'} style={{width:60}}
            handler={() => navigation.dispatch(createJobNavigateAction(dataRow.id, 'edit'))}/>
          </View>
          <PostingTime/>
        </View>
      </View>

      <Text><Text strong>Equipment: </Text>{dataRow.equipment}</Text>
      <Text><Text strong>Required Experience: </Text>{dataRow.experience}</Text>
      <Text><Text strong>Compensation: </Text>{dataRow.compensation}</Text>

      {
          <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-between'}}>
              <CustomButton text={dataRow.apps + ' Applications'} style={{height:32, width:100}}
              handler={() => navigation.dispatch( postedJobApplicationsAction(dataRow.id) )}/>

              <CustomButton white text={'DETALLES'}
              style={styles.button}
              handler={() => navigation.navigate('JobDetails')}/>

             <CustomButton white text={'COPY'}
               style={styles.button}
               handler={() => navigation.dispatch(createJobNavigateAction(dataRow.id, 'copy'))}/>

               <CustomButton white icon={'trash'}
               handler={ this.delete }/>

          </View>
      }
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
