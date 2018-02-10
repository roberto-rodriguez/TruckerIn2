import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import { Container  } from "native-base";
import { Header, Feed} from 'src/components/'
import { connect } from "react-redux";
import * as jobsActions from "src/views/jobs/jobs.actions";
import PostedJobPost from 'src/views/jobs/postedJobs/PostedJobPost'
import I18n from 'react-native-i18n'

class PostedJobsList extends Component {

  loadItems = (page, callback) => this.props.listJobs(page,  {userId: this.props.id, posted: true}, callback)

  itemBuilder = (data, navigation, i, shouldUpdate) => ( <PostedJobPost navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate}/>)

  render() {
    var {isMe, navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={ I18n.t('profile.titles.postedJobs') }
           navigation={navigation} />
         <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
        </View>
      </Container>
    );
  }
}


const mapStateToProps = ({globalReducer, profileReducer}, ownProps) => {
  var profileInfo = ownProps.isMe ? globalReducer.profileInfo : profileReducer.profileInfo

  return {
    id: profileInfo.id
  }
}

  export default connect(mapStateToProps, jobsActions)(PostedJobsList);
