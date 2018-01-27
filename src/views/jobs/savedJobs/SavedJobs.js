import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Content } from "native-base";
import { Header, Feed} from 'src/components/'
import * as jobActions from "src/views/jobs/jobs.actions";
import { connect } from "react-redux";
import SavedJobPost from './SavedJobPost'
import I18n from 'react-native-i18n'

class SavedJobs extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (<SavedJobPost navigation={navigation}  key={i} data={data}/> )

  loadItems = (page, callback) =>   this.props.loadJobs(page, {saved: true}, callback)


  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.saved.title')} />
        <View style={{minHeight:'100%'}}>
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
        </View>
      </Container>
    );
  }
}

export default connect(null, jobActions)(SavedJobs);
