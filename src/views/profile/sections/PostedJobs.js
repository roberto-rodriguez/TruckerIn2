import React, { Component } from "react";
import {  View,  StyleSheet } from "react-native";
import { Button, Container,  Text } from "native-base";
import {  nav} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import theme from 'src/theme/variables/platform'

import * as profileActions from "src/views/profile/profile.actions";
import PostedJobPost from 'src/views/jobs/postedJobs/PostedJobPost'

class PostedJobs extends Component {

  render() {
    var {isMe, navigation, postedJobs} = this.props

    return (
       <View>

       {postedJobs.map( (data, i) => (  <PostedJobPost navigation={navigation}  key={i} data={data}/> ))}

       {postedJobs.length === 3 && (
         <Button full transparent onPress={() => nav(navigation, 'ProfileConnectionList', this.state)}>
           <Text style={{ color: theme.secondaryColor }}>
             {I18n.t('profile.seeMore')}
           </Text>
         </Button>
       )}
       </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight:'100%',
    backgroundColor: '#FFF',
    justifyContent: 'flex-start'
  }
});

const mapStateToProps = ({ profileReducer}) =>  ({
  postedJobs: profileReducer.postedJobs
})


  export default connect(mapStateToProps, profileActions)(PostedJobs);
