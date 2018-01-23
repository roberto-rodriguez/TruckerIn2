import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import {  Container } from "native-base";
import {StackView, Header, Feed, nav, CustomButton} from 'src/components/'
import CareerItem from './CareerItem';
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

class ProfileCareerList extends Component {

    loadItems = (page, callback) => {
      var isMe = this.props.navigation.state.params && this.props.navigation.state.params.isMe

      this.props.loadProfileCareer(isMe, page, callback)
    }

    itemBuilder = (item, navigation, i, shouldUpdate) => (
               <CareerItem
                    key={i}
                    careerItem={item}
                    isMe={this.props.navigation.state.params && this.props.navigation.state.params.isMe}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  render() {
    var { navigation} = this.props
    var isMe = this.props.navigation.state.params && this.props.navigation.state.params.isMe

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={I18n.t('profile.titles.recentJobs')}
           navigation={navigation}
           right={ <CustomButton text={I18n.t('general.add')} handler={() => nav(navigation, 'EditProfileAddExperience')} style={styles.topBarButton}/>}
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

  export default connect(null, profileActions)(ProfileCareerList);
