import React, { Component } from "react";
import { View  } from 'react-native';
import { Container, Content } from "native-base";
import { Header, Feed} from 'src/components/'
import I18n from 'react-native-i18n'
import { NavigationActions } from "react-navigation";
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";

import AppliedJobPost from './AppliedJobPost'


class AppliedJobs extends Component {

  constructor(props){
    super(props)
    this.state = {
      mounted: false
    }

  }

  componentDidMount(props){
    this.setState({mounted: true})
  }

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <AppliedJobPost navigation={navigation}  key={i} data={data}/>
  )

  loadItems = (page, callback) => {
    this.props.loadJobs(page, {applied: true}, callback)
  }


  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.applied.title')} />
        <View style={{minHeight:'100%'}}>
          {
            this.state.mounted &&
            <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
          }
        </View>
      </Container>
    );
  }

}


export default connect(null, jobActions)(AppliedJobs);
