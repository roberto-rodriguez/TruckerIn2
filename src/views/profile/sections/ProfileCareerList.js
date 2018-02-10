import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import {  Container } from "native-base";
import {  Header, Feed, nav, CustomButton} from 'src/components/'
import CareerItem from './CareerItem';
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

class ProfileCareerList extends Component {

    loadItems = (page, callback) => {
      var id = this.props.navigation.state.params.id  || this.props.id

      this.props.loadProfileCareer(id, page, callback)
    }

    itemBuilder = (item, navigation, i, shouldUpdate) => (
               <CareerItem
                    key={i}
                    careerItem={item}
                    userId={(this.props.navigation.state.params && this.props.navigation.state.params.id || this.props.id)}
                    isMe={(this.props.navigation.state.params && this.props.navigation.state.params.isMe || true)}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  render() {
    var { navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={I18n.t('profile.titles.recentJobs')}
           navigation={navigation}
         />
          <Feed
           feedLoader={this.loadItems}
           feedBuilder={this.itemBuilder}
           navigation={navigation}
         />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  topBarButton:{
    marginTop:13,
    borderWidth:0
  }
})

const mapStateToProps = ({globalReducer}) => ({
    id: globalReducer.profileInfo.id
  })

  export default connect(null, profileActions)(ProfileCareerList);
