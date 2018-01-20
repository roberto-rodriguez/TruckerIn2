
import React, { Component } from "react";
import {Image,View  } from 'react-native';
import { Container, Content } from "native-base";
import { Header, Feed} from 'src/components/'

import { NavigationActions } from "react-navigation";
import * as jobActions from "../reducer/jobActions";
import { connect } from "react-redux";

import JobApplicationPost from './JobApplicationPost'


class PostedJobApplications extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <JobApplicationPost navigation={navigation}  key={i} data={data}/>
  )

  loadItems = (page, callback) => {

    this.props.loadJobs(page, {posted: true}, callback)
  }


  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title='Job Applications' />
        <View style={{minHeight:'100%'}}>
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>

        </View>
      </Container>
    );
  }

}

export default connect(null, jobActions)(PostedJobApplications);
