import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from "native-base";
import { connect } from "react-redux";
import {Text,Row, Column, LinkButton, mapStateToProps, T12, BulletsView} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from 'src/views/contacts/ContactsTabBar'
const deviceHeight = Dimensions.get("window").height;

 class Details extends Component {

  render() {
    var {description, salary} = this.props.data

    return (
      <View  style={postStyle.details}>
        <ScrollableTabView renderTabBar={() => <CustomTabBar />}  style={{height: 600}}>
            <View tabLabel="Description"  >
               <T12>{' • ' + description}</T12>
             </View>
             <View tabLabel="Salary & Benefits" >
               <T12 >{' • ' + salary}</T12>
              </View>
         </ScrollableTabView>
      </View>
    )
  }
  }

export default connect(mapStateToProps, jobActions)(Details);
