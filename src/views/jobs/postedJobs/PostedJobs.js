
import React, { Component } from "react";
import {Image,View  } from 'react-native';
import { Container, Content } from "native-base";
import { Header, Feed} from 'src/components/'
import { NavigationActions } from "react-navigation";
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import PostedJobPost from './PostedJobPost'


class PostedJobs extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <PostedJobPost navigation={navigation}  key={i} data={data}/>
  )

  loadItems = (page, callback) => {
    var userId = (this.props.navigation.state.params && this.props.navigation.state.params.userId) || this.props.userId
    var params =  {'author.id': userId}
    this.props.listJobs(page, params, callback)
  }


  render() {
    const navigation = this.props.navigation;

    var paramsUserId = this.props.navigation.state.params && this.props.navigation.state.params.userId

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t(['jobs', 'posted', paramsUserId ? 'title' : 'myTitle'])} />
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
   
      </Container>
    );
  }

}

const mapStateToProps = ({globalReducer}) => ({ userId: globalReducer.profileInfo.id })

export default connect(mapStateToProps, jobActions)(PostedJobs);
