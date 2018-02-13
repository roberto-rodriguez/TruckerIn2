import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import {  TransparentButton, Row, Column, nav,  T14, AgentMsg} from "src/components/";
import I18n from 'react-native-i18n'
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import * as roles from 'src/components/c/Role'


class JobListHeader extends Component {
  render(){
     const {navigation, profileInfo}  = this.props
     var {roleId, postedJobs, savedJobs, appliedJobs} = profileInfo

       if(roleId === roles.DRIVER){
         return (<Row h={50} style={{borderBottomWidth:0.3, borderBottomColor: theme.secondaryColor}}>
           <Column h={50} columns={2} style={{borderRightColor: theme.secondaryColor, borderRightWidth:0.4}}>
            <TransparentButton color text={ savedJobs + ' ' + I18n.t('jobs.saved.title')  } style={{paddingTop:4 }}
             handler={() => nav(navigation, 'SavedJobs')}/>
           </Column>
           <Column h={50} columns={2}>
             <TransparentButton color text={appliedJobs + ' ' + I18n.t('jobs.applied.title') } style={{paddingTop:4}}
             handler={() => nav(navigation, 'AppliedJobs')}/>
           </Column>
         </Row>)
       }else{
         if(postedJobs){
           return (
             <AgentMsg h={70} onPress={() => nav(navigation, 'PostedJobs')}>
                <View>
                  <T14 green>{I18n.t('jobs.headers.postedJobs') + postedJobs + ' ' + I18n.t('jobs.posted.title')}</T14>
                </View>
              </AgentMsg>
            )
         }else{
           return (
             <AgentMsg h={70} onPress={() => nav(navigation, 'PreCreateJob')}>
                <View>
                  <T14 green>{I18n.t('jobs.headers.postFirst')}</T14>
                </View>
              </AgentMsg>
            )
         }
       }
  }
}

const mapStateToProps = ({globalReducer}) => ({ profileInfo: globalReducer.profileInfo })

export default connect(mapStateToProps, jobActions)(JobListHeader);
