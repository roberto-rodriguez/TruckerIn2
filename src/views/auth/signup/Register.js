import React, { Component } from "react";
import { StatusBar, Platform, TouchableHighlight, View } from "react-native";
import { Container, Content, Text, CheckBox } from "native-base";
import Icon from 'react-native-fa-icons';
import {BlockButton, AgentImg, T16, T15, T14, T13, T12, Row, Column, SimpleButton, LinkButton, nav} from 'src/components/'
import styles from "./styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as authActions from "../reducer/authActions";
import * as validator from './validator'

import Information from 'src/views/auth/signup/sections/Information'
import Contact from 'src/views/auth/signup/sections/Contact'
import Experience from 'src/views/auth/signup/sections/Experience'
import Roles from 'src/views/auth/signup/sections/Roles'
import ValidatePhone from 'src/views/auth/signup/sections/ValidatePhone'
import ProfilePic from 'src/views/auth/signup/sections/ProfilePic'
import AcceptTerms from 'src/views/auth/signup/sections/AcceptTerms'

import StepIndicator from 'react-native-step-indicator';


const commonColor = require("src/theme/variables/commonColor");

const titles = ['welcome','personal','contact','experience','validatePhone', 'tos']
const subTitles = [ 'welcome', null, 'contact', null, 'validatePhone' ]
const bullets = ['personal', 'contact', 'experience', 'validatePhone', 'profilePic', 'tos']

const logo = require("../../../../assets/logo.png");

const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:{
        flowPage: 0,
        accessCode: null,
        validFields: {},
        validForm: true
      },
      data:{
        roleId: null,  // 1-Driver, 2-Broker, 3-Company

        firstName: null,
        lastName: null,
        username: null,
        password: null,

        email: null,
        phone: null,
        location: null,
        locationId: null,
        showContactInfo: null,

        experience: null,
        experienceId: null,
        equipment: null,
        equipmentId: null,
        jobStatus: null,
        jobStatusId: null,
        ownerOperator: null,
        overRoadExp: null,
        willTakeOverRoad: null
      }
    };
  }

  componentDidMount(){
      this.props.loadConfig()
  }

  setVal = (prop, val, valId) => this.setState((prevState) => {
         prevState.data[prop] = val

         if(valId){ prevState.data[prop + 'Id'] = valId }

         return prevState
      })

  selectRole = ( role ) => {
     this.setState(prevState => {
         prevState.view.flowPage = 1
         prevState.data.roleId = role

         return prevState
       })
     }

   nextBack = (next) => {
     var {flowPage, validForm, validFields} = this.state.view

     if(next){
       validFields[flowPage] = validator.validate(flowPage, this.state.data)
     }

     var canProceed = true;

     switch(flowPage){
       case 0:
         if(!next){
           this.props.navigation.goBack()
           return
         }
       case 3:
          // if(next){
          //    validForm = canProceed = validator.isValidForm(flowPage, validFields)
          //  }
       case 4:
        //Call validate Phone Number
          break;
       case 5:
         //Call register
         if(next){
           this.props.navigation.navigate("Drawer");
           return
         }
     }

      this.setState(prevState => {
          prevState.view = {
            ...prevState.view,
            validFields,
            validForm,
            flowPage: prevState.view.flowPage + (canProceed ? (next ? 1 : -1) : 0)
          }
          return prevState
        })
      }

  render() {
    const navigation = this.props.navigation;
    var {role, flowPage, validForm} = this.state.view

    return (
      <Container style={styles.background}>
        <StatusBar backgroundColor={ Platform.OS === "android" ? commonColor.primaryColor : "transparent" } barStyle="light-content" />
        <Content fullscreen>
          <View style={styles.logoContainerView}>
            <SimpleButton onPress={() => this.nextBack(false)} style={styles.backArrow}><View>
              <Icon name={'long-arrow-left'} style={{color:'white', fontSize: 26}}/>
            </View></SimpleButton>
            <AgentImg size={85}/>
            <T16 style={{color:'white'}}>{I18n.t( ['signup', 'titles', titles[flowPage] ] ) }</T16>
            {validForm ?
              subTitles[flowPage] && <T14 style={{color:'white'}}>{I18n.t( ['signup', 'subTitles', subTitles[flowPage] ] )}</T14>
              :
               <T14 red>{I18n.t('signup.completeRed')}</T14>
            }
          </View>
 
          {this.buildHeader()}
          {this.buildFlowSection()}

        </Content>

        {
          flowPage === 6 && (
            <Row style={{marginBottom: 10}}>
              <Column columns={8} start>
                <CheckBox checked={false} onPress={() => alert('Accept')} color={commonColor.secondaryColor}/>
              </Column >
              <Column columns={8} colspan={7} start>
                <T15 green>{I18n.t('signup.iAccept')}</T15>
                <LinkButton text={I18n.t('signup.tos')}  onPress={() => nav(navigation, 'TOS')}/>
              </Column >
            </Row>
          )
        }

        {flowPage > 0 && (<BlockButton text={flowPage === 5 ? I18n.t('signup.acceptAndFinish') : I18n.t('signup.next')} onPress={() => this.nextBack(true)}/>)}

      </Container>
    );
  }


  buildHeader = () => {
    var flowPage = this.state.view.flowPage

    if(flowPage === 0){
      return (<Row><Column>
                <T15 style={{color:commonColor.primaryColor}}>SELECT ROLE</T15>
              </Column></Row>)
    }else{
      return  (
                <View style={{marginTop:15}}>
                  <StepIndicator
                    customStyles={styles.stepIndicator}
                    currentPosition={flowPage - 1}
                    stepCount={5}
                    onPress={(number) => this.goToPage(number + 1)}
                    labels={ ["Personal","Contact","Experience", "Validate Phone","Terms"]}
                    />
                </View>
              )
    }
  }

  buildFlowSection = () => {
    var {data, view} = this.state
    const navigation = this.props.navigation;
    var flowPage = view.flowPage

    switch(flowPage){
      case 0: return <Roles selectRole={this.selectRole}/>
      case 1: return <Information data={data} setVal={this.setVal}/>
      case 2: return <Contact data={data} setVal={this.setVal} navigation={navigation}/>
      case 3: return <Experience data={data} setVal={this.setVal}/>
      case 4: return <ValidatePhone data={data} setVal={this.setVal}/>
      case 5: return <ProfilePic data={data} setVal={this.setVal} doItLatter={() => this.nextBack(true)}/>
      case 6: return <AcceptTerms data={data} setVal={this.setVal}/>
    }
  }

  buildBullet = (selected, number, text) => {
    // debugger;
    // if( !validator.isValid(number, this.state.view.validForm, this.state.view.validFields) ){
    //   return (<Column columns={3} h={60} key={number}>
    //     <SimpleButton onPress={() => this.goToPage(number)}>
    //       <View style={{alignItems: "center", justifyContent: "center"}}>
    //         <View  style={[styles.bullet, styles.redBullet]}>
    //           <T12 shortLine strong={selected} style={{color:'white'}}>{number}</T12>
    //         </View>
    //         <T12 shortLine strong={selected} red>{text}</T12>
    //       </View>
    //     </SimpleButton>
    //   </Column>)
    // }

    return selected ?
    (

        <Column columns={3} h={60} key={number}>
          <SimpleButton onPress={() => this.goToPage(number)}>
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <View  style={[styles.bullet, styles.selectedBullet]}>
                <T12 shortLine strong style={{color:'white'}}>{number}</T12>
              </View>
              <T12 shortLine strong style={styles.greenColor}
                red={ !validator.isValid(number, this.state.view.validForm, this.state.view.validFields) }
              >{text}</T12>
            </View>
          </SimpleButton>
        </Column>

     )
      :
      (
          <Column columns={3} h={60} key={number}>
            <SimpleButton onPress={() => this.goToPage(number)}>
              <View style={{alignItems: "center", justifyContent: "center"}}>
                <View  style={[styles.bullet, styles.deselectedBullet]}>
                  <T12 shortLine strong style={{color: commonColor.primaryColor}}>{number}</T12>
                </View>
                <T12 shortLine
                 red={ !validator.isValid(number, this.state.view.validForm, this.state.view.validFields) }
                >{text}</T12>
              </View>
            </SimpleButton>
          </Column>
      )
  }

  goToPage = ( page ) => this.setState(prevState => {
    prevState.view.flowPage = page
    return prevState
  })
}

function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang
  }
}



export default connect(mapStateToProps, authActions)(Register);
