import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import {  TransparentButton, Row, Column, nav,  T14, AgentMsg} from "src/components/";

import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import * as roles from 'src/components/c/Role'


class JobListHeader extends Component {
  render(){
     const {navigation, profileInfo}  = this.props
     var {roleId, postedJobs, savedJobs} = profileInfo

       if(roleId === roles.DRIVER){
         return (<Row h={50} style={{borderBottomWidth:0.3, borderBottomColor: theme.secondaryColor}}>
           <Column h={50} columns={2} style={{borderRightColor: theme.secondaryColor, borderRightWidth:0.4}}>
            <TransparentButton color text={ savedJobs + ' Trabajos Salvados'} style={{paddingTop:4 }}
             handler={() => nav(navigation, 'SavedJobs')}/>
           </Column>
           <Column h={50} columns={2}>
             <TransparentButton color text={'2 Trabajos Aplicados'} style={{paddingTop:4}}
             handler={() => nav(navigation, 'AppliedJobs')}/>
           </Column>
         </Row>)
       }else{
         if(postedJobs){
           return (
             <AgentMsg h={70} onPress={() => nav(navigation, 'PostedJobs')}>
                <View>
                  <T14 green>{'Click here to follow up on your ' + postedJobs + ' Posted Jobs'}</T14>
                </View>
              </AgentMsg>
            )
         }else{
           return (
             <AgentMsg h={70} onPress={() => nav(navigation, 'PreCreateJob')}>
                <View>
                  <T14 green>{'Click here to post your first Job'}</T14>
                </View>
              </AgentMsg>
            )
         }
       }
  }
}

const mapStateToProps = ({globalReducer}) => {
  return  ({
    profileInfo: globalReducer.profileInfo
  })
}

export default connect(mapStateToProps, jobActions)(JobListHeader);
