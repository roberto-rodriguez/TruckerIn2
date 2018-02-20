import React, { Component } from "react";
import { StatusBar, Platform, TouchableHighlight, View } from "react-native";
import {Container, Content } from "native-base";

import {  Header, BlockButton, CustomButton, StackView, Spinner} from 'src/components/'
import styles from "./styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";

import Information from './sections/Information'
import Equipment from './sections/Equipment'
import Description from './sections/Description'
import Salary from './sections/Salary'

import StateList from 'src/components/views/locationPicker/StateList'
import LocationPicker from 'src/components/views/locationPicker/'

import StepIndicator from 'react-native-step-indicator';

const commonColor = require("src/theme/variables/commonColor");


var bulletsKeys = ['Information', 'Equipment', 'Locations', 'Description', 'Salary']

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
        bullets: bulletsKeys
      },
      data:{
        title: null,
        categoryId: null,
        distanceId: null,
        phone: null,
        experienceId: null,
        experience: null,
        equipmentIds: null,

        description: null,
        salary: null
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



  setVal = (prop, val, valId) => this.setState((prevState) => {
         prevState.data[prop] = val
         if(valId){ prevState.data[prop + 'Id'] = valId }

         return prevState
      })



  render() {
    const {navigation} = this.props
    var {role, flowPage, validForm, errorMsg, bullets, validatedAccessCode, loading} = this.state.view

    return (
      <Container white>
        <Header navigation={navigation} back title={'Create Job'} onBack={() => this.nextBack()}/>

          <View style={styles.subHeader}>
            <StepIndicator
                  customStyles={styles.stepIndicator}
                  currentPosition={flowPage}
                  stepCount={5}
                  onPress={(number) => this.goToPage(number)}
                  labels={bullets}
                  />
        </View>

        {this.buildSection()}

        <BlockButton text={'Next'} onPress={() => this.nextBack(true)}/>
      </Container>
    );
  }

  nextBack = (next) => {
    var {view, data} = this.state
    var {flowPage, validForm, invalidFields, loading} = view



   if(loading)return;

   this.setState({...this.state, view: {...view, loading: true}});

    if(next){
      invalidFields = requiredFields[flowPage].filter(f => !data[f]) || []
      validForm = invalidFields.length === 0
    }

    switch(flowPage){
      case 0:
        if(!next){
          this.props.navigation.goBack()
          return
        }
        break;
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
      case 2: section = data.distanceId === 1 ? <StateList/> : <LocationPicker setVal={this.setVal} data={data} invalidFields={invalidFields} hideHeader/>
        break;
      case 3: section = <Description setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
      case 4: section = <Salary setVal={this.setVal} data={data} invalidFields={invalidFields}/>
        break;
    }

    if(flowPage === 2){
      return section;
    }else{
      return this.applyWrapper( section )
    }
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
}

function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang,
    headerError: globalReducer.view.headerError,
    headerTimestamp: globalReducer.view.headerTimestamp
  }
}

export default connect(mapStateToProps, authActions)(NewJob);
