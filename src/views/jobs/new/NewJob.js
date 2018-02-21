import React, { Component } from "react";
import { StatusBar, Platform, TouchableHighlight, View } from "react-native";
import {Container, Content } from "native-base";

import {  Header, BlockButton, CustomButton, StackView, Spinner} from 'src/components/'
import styles from "./styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";

import Information from './sections/Information'
import Equipment from './sections/Equipment'
import Description from './sections/Description'
import Salary from './sections/Salary'
import Preview from './sections/Preview'

import StateList from 'src/components/views/locationPicker/StateList'
import LocationPicker from 'src/components/views/locationPicker/'

import StepIndicator from 'react-native-step-indicator';

const commonColor = require("src/theme/variables/commonColor");


var bulletsKeys = ['information', 'equipment', 'locations', 'description', 'salary']

const requiredFields = {
  0: ['title', 'categoryId', 'distanceId', 'experienceId'],
  1: ['equipmentIds']
}

class NewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:{
        loading: false,
        flowPage:0,
        invalidFields: [],
        validForm: true,
        bullets: bulletsKeys.map(key =>  I18n.t( ['jobs', 'new', 'bullets' , key ] ))
     },
      data:{
        title: null,
        categoryId: null,
        distanceId: null,
        phone: null,
        phoneOption: 1,
        experienceId: null,
        experience: null,
        equipmentIds: null,

        description: null,
        salary: null,

        location: {}
        // {
          // stateId,
          // stateName
          // stateIdList: [],
          // cityIdList:[],
          // cityNameList: []
        // }
      }
    };
  }

  componentWillReceiveProps(newProps){
    if(newProps.headerError){
      this.setState(prevState => {
        prevState.view.loading= false
        return prevState
      })
    }
  }

 t = (key) => I18n.t(['jobs', 'new', key])

  setVal = (prop, val, valId) => this.setState((prevState) => {
         prevState.data[prop] = val
         if(valId){ prevState.data[prop + 'Id'] = valId }

         return prevState
      })



  render() {
    var {state, props, t} = this
    const {navigation} = props
    var {role, flowPage, validForm, errorMsg, bullets, validatedAccessCode, loading} = state.view

    var preview = flowPage === 5

    return (
      <Container white>
        <Header navigation={navigation} back title={t(preview ? 'preview': 'title')} onBack={() => this.nextBack()}/>
          {
            preview ?
            (
              <BlockButton text={t('acceptAndPublish')} onPress={() => this.nextBack(true)} style={{marginBottom: 5}}/>
            ):(
              <View style={styles.subHeader}>
                <StepIndicator
                      customStyles={styles.stepIndicator}
                      currentPosition={flowPage}
                      stepCount={5}
                      onPress={(number) => this.goToPage(number)}
                      labels={bullets}
                      />
              </View>
            )
          }
        {this.buildSection()}

        {(!preview) && (<BlockButton text={ t('next')} onPress={() => this.nextBack(true)}/>)}
      </Container>
    );
  }

  nextBack = (next) => {
    var {view, data} = this.state
    var {flowPage, validForm, invalidFields, loading} = view



   if(loading)return;

   this.setState({...this.state, view: {...view, loading: true}});

    // if(next){
    //   invalidFields = requiredFields[flowPage].filter(f => !data[f]) || []
    //   validForm = invalidFields.length === 0
    // }

    switch(flowPage){
      case 0:
        if(!next){
          this.props.navigation.goBack()
          return
        }
        break;
      // case 4: return this.submit()
    }

     this.setState(prevState => {
         prevState.view = {
           ...prevState.view,
           invalidFields,
           validForm,
           loading: false,
           flowPage: prevState.view.flowPage + (next ? (validForm ? 1 : 0) : -1)
         }
         return prevState
       })
     }

  buildSection = () => {
    var {data, view} = this.state
    const navigation = this.props.navigation;
    var {flowPage, validForm, invalidFields, loading} = view

    if(loading)return <Spinner/>

    var section = null;

    switch(flowPage){
      case 0: section = <Information setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
      case 1: section = <Equipment setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
      case 2: section = data.distanceId === 2 ?
             <StateList location={data.location || {}} onSelectState={this.selectMultiState} MULTIPLE_STATES/>
           : <LocationPicker
              location={data.location || {}}
              selectSingleState={this.selectSingleState}
              selectMultiCity={this.selectMultiCity}
              MULTIPLE_CITIES
              hideHeader
              />
        break;
      case 3: section = <Description setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
      case 4:section = <Salary setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
      case 5: section = <Preview data={data}/>

   }

    if(flowPage === 2){
      return section;
    }else{
      return this.applyWrapper( section )
    }
  }

  submit = () => {
    this.setState({...this.state, view: {...this.state.view, loading: true}})
    debugger;
    this.props.createJob(this.state.data, () => {
      this.setState({...this.state, view: {...this.state.view, loading: false}})
    }, 'create');
  }

  applyWrapper = (children) => (
    <Content fullscreen >
      {children}
    </Content>
  )

  goToPage = ( page ) => {
    if(page < this.state.view.flowPage){
      this.setState({
        ...this.state,
        view: {
          ...this.state.view,
          validForm: true,
          flowPage: page
        }
      })
  }
}

selectMultiState = ( stateId ) =>  this.setState((prevState) => {
  stateId += '';

  var existentStateIdList = (prevState.data.location && prevState.data.location.stateIdList ) || [];

  var stateIdList = existentStateIdList.filter(e => e != stateId)

  if (existentStateIdList.length === stateIdList.length){
    stateIdList.push( stateId )
  }

  return {...prevState,
          data:{...prevState.data,
                location: {stateIdList}
              }
          }
 })


//@ This is for MULTI_CITY mode
selectSingleState = ( stateId, stateName ) =>  this.setState((prevState) => {
  return {...prevState,
          data:{...prevState.data,
                location: { stateId, stateName }  //Reset cityList
              }
          }
 })

 selectMultiCity = ( cityId, cityName ) =>  this.setState((prevState) => {
   cityId += '';
   var existentCityIdList = (prevState.data.location && prevState.data.location.cityIdList ) || [];
   var existentCityNameList = (prevState.data.location && prevState.data.location.cityNameList ) || [];

   var cityIdList = existentCityIdList.filter(e => e != cityId)
   var cityNameList = existentCityNameList.filter(e => e != cityName)

   if (existentCityIdList.length === cityIdList.length){
     cityIdList.push( cityId )
   }

   if (existentCityNameList.length === cityNameList.length){
     cityNameList.push( cityName )
   }

   return {...prevState,
           data:{...prevState.data,
                 location: {
                   ...(prevState.data.location),
                   cityIdList,
                   cityNameList
                 }
               }
           }
  })

}

function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang,
    headerError: globalReducer.view.headerError,
    headerTimestamp: globalReducer.view.headerTimestamp
  }
}

export default connect(mapStateToProps, jobActions)(NewJob);
