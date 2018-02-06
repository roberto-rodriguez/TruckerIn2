import React, { Component } from "react";
import { StatusBar, Platform, TouchableHighlight, View } from "react-native";
import { Container, Content, Text,  Spinner } from "native-base";
import Icon from 'react-native-fa-icons';
import {BlockButton, AgentImg, T16, T15, T14, T13,  Row, Column, RowColumn, SimpleButton, LinkButton, nav} from 'src/components/'
import styles from "./styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";
import * as validator from './validator'
import * as roles from 'src/components/c/Role'
import Information from 'src/views/auth/signup/sections/Information'
import Contact from 'src/views/auth/signup/sections/Contact'
import Experience from 'src/views/auth/signup/sections/Experience'
import About from 'src/views/auth/signup/sections/About'
import Roles from 'src/views/auth/signup/sections/Roles'
import ValidatePhone from 'src/views/auth/signup/sections/ValidatePhone'
import ProfilePic from 'src/views/auth/signup/sections/ProfilePic'
import AcceptTerms from 'src/views/auth/signup/sections/AcceptTerms'

import StepIndicator from 'react-native-step-indicator';

const commonColor = require("src/theme/variables/commonColor");

var titles = ['welcome','personal','contact','experience','validatePhone', 'tos', 'loading']
const subTitles=['welcome',null     ,'contact',null      ,'validatePhone',  null, 'loading' ]
const subTitlesError = [null, null  ,null     ,null      ,'validatePhone', 'tos']

var bulletsKeys = ['personal', 'contact', 'about', 'validatePhone', 'tos']

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:{
        loading: false,
        flowPage: 0,
        invalidFields: [],
        validForm: true,
        bullets: bulletsKeys.map(key =>  I18n.t( ['signup', 'bullets', key ] )),
        acceptTerms: false,
        errorMsg: null,
        sentAccessCode: false,
        realAccessCode: null,
        validatedAccessCode: false
      },
      data:{
        roleId: 1,  // 1-Driver, 2-Broker, 3-Company
        role: null,

        firstName: null,
        lastName: null,
        password: null,

        email: null,
        phone: null,
        location: null,
        //  {
        //   stateId: null,
        //   cityId: null,
        //   stateName: null,
        //   cityName: null,
        //   locationName: null,
        // },

        showContactInfo: null,

        about: null,
        experience: null,
        experienceId: null,
        equipment: null,
        equipmentId: null,
        jobStatus: null,
        jobStatusId: null,
        ownerOperator: null,
        accessCode: ''
      }
    };
  }

  setVal = (prop, val, valId) => this.setState((prevState) => {
         prevState.data[prop] = val
         if(valId){ prevState.data[prop + 'Id'] = valId }

         if(prop === 'phone' && prevState.view.sentAccessCode){ //If already sent the access code, but change the phone number, send it again
           prevState.view.sentAccessCode = false
         }

         if(prop === 'accessCode'){
            prevState.view.validatedAccessCode = false
         }
         return prevState
      })



  render() {
    const {navigation} = this.props
    var {role, flowPage, validForm, errorMsg, bullets, validatedAccessCode, loading} = this.state.view

    return (
      <Container style={styles.background}>
        <StatusBar backgroundColor={ Platform.OS === "android" ? commonColor.primaryColor : "transparent" } barStyle="light-content" />

        <Content fullscreen>
          <View style={styles.logoContainerView}>
            <SimpleButton onPress={() => this.nextBack(false)} style={styles.backArrow}><View>
              <Icon name={'long-arrow-left'} style={styles.arrowLeft}/>
            </View></SimpleButton>
            <AgentImg size={85}/>
            <T16 style={{color:'white'}}>{I18n.t( ['signup', 'titles', titles[flowPage] ] ) }</T16>
            {validForm ?
              subTitles[flowPage] && <T14 style={{color:'white'}}>{I18n.t( ['signup', 'subTitles', subTitles[flowPage] ] )}</T14>
              :
              <T14 red>{errorMsg}</T14>
            }
          </View>

          <View style={styles.subHeader}>
            {flowPage ?
              ( <StepIndicator
                    customStyles={styles.stepIndicator}
                    currentPosition={flowPage - 1}
                    stepCount={5}
                    onPress={(number) => this.goToPage(number + 1)}
                    labels={bullets}
                    />
              ) :
              ( <RowColumn>
                  <T15 green>{I18n.t('signup.roles.selectRole')}</T15>
                </RowColumn>
              )
          }
        </View>

          {  (loading || flowPage > 5) ? (<Spinner color={commonColor.secondaryColor} /> ) :  this.buildFlowSection()}

        </Content>

        {
          flowPage === 5 && (
            <SimpleButton onPress={this.acceptTerms}>
              <View>
                <Row style={{marginBottom: 10}}>
                  <Column columns={8}>
                    <Icon name={this.state.view.acceptTerms ? 'check-circle-o' : 'circle-thin' } style={{color: (validForm ? commonColor.secondaryColor : 'red'), fontSize: 24}}/>
                  </Column>
                  <Column columns={8} colspan={7} start>
                    <T15 green>{I18n.t('signup.iAccept')}</T15>
                    <LinkButton text={I18n.t('signup.tos')}  onPress={() => nav(navigation, 'TOS')}/>
                  </Column>
                </Row>
              </View>
          </SimpleButton>
          )
        }

        {
           !loading && (
            <BlockButton
               show={flowPage != 0 && (flowPage != 4 || (flowPage === 4 && validatedAccessCode) ) }
               text={flowPage === 5 ? I18n.t('signup.acceptAndFinish') : I18n.t('signup.next')}
               onPress={() => this.nextBack(true)}/>
          )
        }

      </Container>
    );
  }

  nextBack = (next) => {
    var {view, data} = this.state
    var {flowPage, validForm, invalidFields, loading} = view

    if(loading)return;

    this.setState({...this.state, view: {...view, loading: true}});

    if(next){
      invalidFields = validator.validate(flowPage, data)
      validForm = invalidFields.length === 0
    }

    var serverErrorMsg = null


    switch(flowPage){
      case 0:
        if(!next){
          this.props.navigation.goBack()
          return
        }
        break;
      case 2:
        if(next && validForm && !view.sentAccessCode){
            return this.requestAccessCode();
        }
        break;
      case 5:
        if(next ){
          validForm = view.acceptTerms

        if( validForm){
            this.props.register( data, (result, resultMessage) => {
              if(result){
                this.props.navigation.navigate("Drawer");
                return
              }else{
                serverErrorMsg = resultMessage
              }
            })
        }
      }
    }

     this.setState(prevState => {
         prevState.view = {
           ...prevState.view,
           invalidFields,
           validForm,
           loading: flowPage == 5 && next,
        //   sentAccessCode: (sentAccessCode || prevState.sentAccessCode),
           errorMsg: serverErrorMsg ||  I18n.t( ['signup', 'subTitlesError', (subTitlesError[flowPage] || 'completeRed')] ),
           flowPage: prevState.view.flowPage + (next ? (validForm ? 1 : 0) : -1)
         }
         return prevState
       })
     }

  buildFlowSection = () => {
    var {data, view} = this.state
    const navigation = this.props.navigation;
    var {flowPage, validForm} = view

    switch(flowPage){
      case 0: return <Roles selectRole={this.selectRole}/>
      case 1: return <Information data={data} setVal={this.setVal} invalidFields={view.invalidFields}/>
      case 2: return <Contact data={data} setVal={this.setVal} setValues={this.setValues} navigation={navigation} invalidFields={view.invalidFields}/>
      case 3: return (data.roleId === roles.DRIVER ? <Experience data={data} setVal={this.setVal} invalidFields={view.invalidFields}/>
                        : <About data={data} setVal={this.setVal} navigation={navigation}/>
                      )
      case 4: return <ValidatePhone
          accessCode={data['accessCode']}
          phone={data['phone']}
          setVal={this.setVal}
          navigation={navigation}
          requestAccessCode={this.requestAccessCode}
          validateAccessCode={this.validateAccessCode}
          validForm={validForm}
        />
      case 5: return <AcceptTerms data={data} setVal={this.setVal}/>
    }
  }

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

selectRole = ( role, roleKey ) => {
  switch(role){
    case roles.DRIVER: titles[3] = 'experience'
        break;
    case roles.BROKER: titles[3] = 'aboutMe'
        break;
    case roles.COMPANY: titles[3] = 'aboutUs'
                        titles[1] = 'companyInfo'
        break;
  }

   this.setState(prevState => {
       prevState.view.flowPage = 1
       prevState.data.roleId = role
       prevState.data.role = roleKey

       return prevState
     })
   }

   requestAccessCode = (stayInSamePage) => this.props.sendAccessCode( this.state.data.phone, (newAccessCode) => this.setState(prevState => {
     var isValid = newAccessCode && newAccessCode !== '1'

     prevState.view = {
      ...prevState.view,
      loading: false,
      validForm: isValid,
      invalidFields: ['phone'],
      sentAccessCode: isValid,
      realAccessCode: newAccessCode,
      flowPage:  prevState.view.flowPage + (isValid && !stayInSamePage ? 1 : 0),
      errorMsg: isValid ? null : 'This phone number already exist'
     }

     return prevState
     }))


  validateAccessCode = (accessCode) => {
    var result =  accessCode === this.state.view.realAccessCode

    this.setState(prevState => {
       prevState.view = {
         ...prevState.view,
         validForm: result,
         loading: false,
         flowPage: prevState.view.flowPage + (result ? 1 : 0),
         errorMsg: I18n.t('signup.subTitlesError.validatePhone'),
         validatedAccessCode: result
       }
       return prevState
     })
  }


  acceptTerms = () => this.setState((prevState) => {
    prevState.view.acceptTerms = !prevState.view.acceptTerms
    prevState.view.validForm = prevState.view.acceptTerms
    return prevState
  })
}


function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang
  }
}

export default connect(mapStateToProps, authActions)(Register);
