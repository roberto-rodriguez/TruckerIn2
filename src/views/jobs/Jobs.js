import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import { Button } from "native-base";
import {Feed, TransparentButton, Row, Column, nav, Header, T14, AgentImg} from "src/components/";

import HeaderBtn from 'src/components/header/buttons/HeaderBtn'
import MainHeader from 'src/components/header/MainHeader'
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import JobPost from './JobPost'
import * as roles from 'src/components/c/Role'
import JobListHeader from './list/JobListHeader'

 class Jobs extends Component {

   constructor(props) {
       super(props)

       this.state = {
         searchParams:{},
         reset:false
       }
  }

  onSearch = (searchParams) => {
    debugger;
    this.setState((prevState) => ({
      ...prevState,
      searchParams,
      reset:true
    }))
  }


loadItems = (page, callback) => {
  var reset = this.state.reset;
  this.props.loadJobs(page, this.state.searchParams, callback, reset)

  if(reset){
    this.setState((prevState) => ({
      ...prevState,
      reset: false
    }))
  }
}

 render(){
    const {navigation, roleId}  = this.props

   return (
     <View style={{minHeight:'100%' }}>
        <MainHeader navigation={navigation}
          title={'Jobs'}
          right={<HeaderBtn icon='search' handler={() => nav(navigation, 'SearchJobs', {searchParams: this.state.searchParams, callback: this.onSearch})} style={{padding:10}}/>}
         />

         <Feed
           reset={this.state.reset}
           feedLoader={this.loadItems}
           feedBuilder={(data, navigation, i, shouldUpdate) => (<JobPost applyBar navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate} />)}
           emptyElement={(<AgentImg text={'Not Jobs were found with the specified criterias.'}/>)}
           navigation={navigation}>

           <JobListHeader navigation={navigation}/>
         </Feed >

         {
           roleId != roles.DRIVER &&
           <Button light block rounded onPress={() => nav(navigation, 'PreCreateJob')} style={styles.createButton} >
             <Icon name={'edit'} style={{fontSize: 23, color: global.secondaryColor }}/>
           </Button>
         }
       </View>)
 }
}

const styles = StyleSheet.create({
    createButton: {
      position:'absolute',
      bottom:70,
      right:20,
      height: 60,
      width:60
    }
  })


  const mapStateToProps = ({globalReducer}) => {
    return  ({
      roleId: globalReducer.profileInfo.roleId
    })
  }
  export default connect(mapStateToProps, jobActions)(Jobs);
