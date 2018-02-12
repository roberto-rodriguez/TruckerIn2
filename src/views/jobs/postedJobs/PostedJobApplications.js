
import React, { Component } from "react";
import {Image,View  } from 'react-native';
import { Container, Content } from "native-base";
import { Header, Feed} from 'src/components/'
import I18n from 'react-native-i18n'
import { NavigationActions } from "react-navigation";
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";

import JobApplicationPost from './JobApplicationPost'


class PostedJobApplications extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <JobApplicationPost navigation={navigation}  key={i} data={data}/>
  )

  loadItems = (page, callback) => {
    this.props.listApps(page, {'job.id': this.props.navigation.state.params.jobId}, callback)
  }


  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.app.titles')}/>
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/> 
      </Container>
    );
  }
}

const mapStateToProps = ({globalReducer}) => ({ userId: globalReducer.profileInfo.id })

export default connect(mapStateToProps, jobActions)(PostedJobApplications);
