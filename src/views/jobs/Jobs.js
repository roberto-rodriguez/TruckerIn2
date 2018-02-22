import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import { Button } from "native-base";
import {Feed, nav, Header, T14, AgentImg} from "src/components/";
import HeaderBtn from 'src/components/header/buttons/HeaderBtn'
import MainHeader from 'src/components/header/MainHeader'
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform';
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";
import JobPost from './XJobPost'
import * as roles from 'src/components/c/Role'
import JobListHeader from './list/JobListHeader'
import I18n from 'react-native-i18n'


 class Jobs extends Component {

   constructor(props) {
       super(props)

       this.state = {
         params:null,
         reset:false
       }
  }

  onSearch = (params) => {
    this.setState((prevState) => ({
      ...prevState,
      params,
      reset:true
    }))
  }


loadItems = (page, callback) => {
  var {reset, params} = this.state

  if(page === -1){
    this.props.cachedJobList( callback )
  }else{
    this.props.xJobList(page, params, callback, reset)

    if(reset){
      this.setState( {reset: false })
    }
  }
}

 render(){
    const {navigation, roleId}  = this.props

   return (
     <View style={{minHeight:'100%', paddingBottom: 50}}>
        <MainHeader navigation={navigation}
          title={I18n.t('jobs.title')}
          right={<HeaderBtn icon='search'
                  handler={() => nav(navigation, 'SearchJobs', {searchParams: this.state.params, callback: this.onSearch})}
                  style={{padding:10}}/>}
         />

         <Feed
           initialPage={this.state.reset ? 0 : -1} 
           starting={this.state.reset}
           feedLoader={this.loadItems}
           feedBuilder={(data, navigation, i, shouldUpdate) => (<JobPost applyBar navigation={navigation}  key={i} elemId={i} data={data} shouldUpdate={shouldUpdate} />)}
           emptyElement={(<AgentImg text={I18n.t('jobs.headers.emptyText')} style={{marginTop: 40}}/>)}
           navigation={navigation}>

           {!this.state.params && (<JobListHeader navigation={navigation}/>)}
         </Feed >

         {
           roleId != roles.DRIVER &&
           <Button light block rounded onPress={() => nav(navigation, 'NewJob')} style={styles.createButton} >
             <Icon name={'edit'} style={{fontSize: 23, color: 'white' }}/>
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
      width:60,
      backgroundColor:theme.secondaryColor,

    }
  })


  const mapStateToProps = ({globalReducer}) => {
    return  ({
      roleId: globalReducer.profileInfo.roleId
    })
  }
  export default connect(mapStateToProps, jobActions)(Jobs);
