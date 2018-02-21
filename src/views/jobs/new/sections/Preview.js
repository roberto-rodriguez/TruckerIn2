import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";

import * as jobActions from "src/views/jobs/jobs.actions";

import Details from 'src/views/jobs/post/Details'
import JobPost from 'src/views/jobs/post/JobPost'

 class Preview extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.shouldUpdate === undefined || nextProps.shouldUpdate == null || this.props.lang != nextProps.lang){
      return true;
    }
     return nextProps.shouldUpdate
  }

  render() {
    var {data, navigation, details, userName, profileImg} = this.props

    var {stateIdList, cityNameList, stateId } = data.location

    data.stateIds = stateIdList ? stateIdList.join(',') : stateId
    data.city = cityNameList && cityNameList.join(',')

    var job = this.props.parseJob(data);

    job.userName = userName;
    job.profileImg = profileImg;
    job.createdAt = (new Date()).getTime();

    return (
      <JobPost data={job} navigation={navigation}>
        <Details data={job}/>
      </JobPost>
    )
    }
  }

    const mapStateToProps = ({globalReducer}) => ({
      userName: globalReducer.profileInfo.firstName,
      profileImg: globalReducer.profileInfo.profileImg
    });

    export default connect(mapStateToProps, jobActions)(Preview);
