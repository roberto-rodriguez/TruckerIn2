
import React, { Component } from "react";
import { StyleSheet,Image,View , Text } from 'react-native';
import { Container, Content, Button,Thumbnail} from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T18, CustomButton, T13, T14, T15, T16,ListItem, AgentImg, RowColumn } from 'src/components/'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as globalActions from "src/boot/reducers/global.actions";
import I18n from 'react-native-i18n'

class PreCreateJob extends Component {

  constructor(props) {
      super(props)

      this.state = {
        created: false,
        jobId: null
      }
}

onCreate = (jobId) => {
  debugger;
  this.setState({
    created: true,
    jobId
  })
}

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.create')}/>

       {this.state.created ? this.postCreate(navigation) : this.preCreate(navigation)}

      </Container>
    );
  }

  preCreate = (navigation) => (
    <Content fullscreen contentContainerStyle={styles.container}>
      <AgentImg text={I18n.t('jobs.pre.wantToCreate')}/>

    <T15 green  style={{marginTop:10, marginBottom:20}}>{I18n.t('jobs.pre.isEasy')}</T15>

      <ListItem
        borderTop
        icon={'hand-o-right'}
        value={I18n.t('jobs.pre.createNew')}
        navigation={navigation}
        routeName={'CreateJob'}
        params={{callback: this.onCreate}}
      />

    <T14 green style={{margin:10}}>{I18n.t('jobs.pre.copyJobDesc')}<T14 strong green></T14>{I18n.t('jobs.pre.copyIt')}</T14>

      <ListItem
        borderTop
        icon={'hand-o-right'}
        navigation={navigation}
        routeName={'PostedJobs'}
        value={I18n.t('jobs.pre.seePostedJobs')}
      />


    </Content>
  )

postCreate = (navigation) => (
  <Content fullscreen contentContainerStyle={styles.container}>
    <AgentImg text={I18n.t('jobs.pre.jobCreated')} text2={I18n.t('jobs.pre.success')}/>

    <T14 green  style={{margin:10}}>{I18n.t('jobs.pre.followUpDesc')}</T14>

    <ListItem
      borderTop
      icon={'hand-o-right'}
      navigation={navigation}
      routeName={'PostedJobs'}
      value={I18n.t('jobs.pre.seePosted')}
    />

  <T14 green  style={{margin:10}}>{I18n.t('jobs.pre.copyJobDesc2')}</T14>

    <ListItem
      borderTop
      icon={'hand-o-right'}
      value={I18n.t('jobs.pre.copyAndCreate')}
      navigation={navigation}
      routeName={'CreateJob'}
      params={{callback: this.onCreate, action: 'copy', jobId: this.state.jobId}}
    />
    <ListItem
      icon={'hand-o-right'}
      value={I18n.t('jobs.pre.createNew')}
      navigation={navigation}
      routeName={'CreateJob'}
      params={{callback: this.onCreate}}
    />
  </Content>
)
}


const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:20
    },
    thumbnail: {
      borderWidth:0.2,
      borderColor:theme.secondaryColor,
      margin: 20
    }
    })


    const mapStateToProps = state => ({

    });
    export default connect(mapStateToProps, globalActions)(PreCreateJob);
