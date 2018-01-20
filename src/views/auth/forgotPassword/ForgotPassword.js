
import React, { Component } from "react";
import { StatusBar, Platform, TouchableHighlight, View } from "react-native";
import { Container, Content, Text, CheckBox } from "native-base";
import Icon from 'react-native-fa-icons';
import {BlockButton, AgentImg, T16, T15, T14, T13, T12, Row, Column, SimpleButton, LinkButton, nav} from 'src/components/'
import styles from "../signup/styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import Information from 'src/views/auth/signup/sections/Information'
import Contact from 'src/views/auth/signup/sections/Contact'

import Experience from 'src/views/auth/signup/sections/Experience'
import Roles from 'src/views/auth/signup/sections/Roles'
import ValidatePhone from 'src/views/auth/signup/sections/ValidatePhone'
import ProfilePic from 'src/views/auth/signup/sections/ProfilePic'
import AcceptTerms from 'src/views/auth/signup/sections/AcceptTerms'

const commonColor = require("src/theme/variables/commonColor");

const titles = ['welcome','personal']
const subTitles = [ 'welcome', 'validatePhone' ]

const logo = require("../../../../assets/logo.png");

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view:{
        flowPage: 0,
        accessCode: null,
        validFields: {},
        validForm: true
      }
    };
  }

  setVal = (prop, val, valId) => this.setState((prevState) => {
         prevState.data[prop] = val

         if(valId){ prevState.data[prop + 'Id'] = valId }

         return prevState
      })

   nextBack = (next) => {
     var {flowPage, validForm, validFields} = this.state.view

     var canProceed = true;

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
            <T16 style={{color:'white'}}>{  titles[flowPage] }</T16>
            {subTitles[flowPage] && (<T14 style={{color:'white'}}>{ subTitles[flowPage] }</T14>)}
          </View>
          {this.buildHeader()}
          {this.buildFlowSection()}

        </Content>


        <BlockButton text={flowPage === 6 ? I18n.t('signup.acceptAndFinish') : I18n.t('signup.next')} onPress={() => this.nextBack(true)}/>

      </Container>
    );
  }


  buildHeader = () => {
    return (<Row><Column>
                      <T15 style={{color:commonColor.primaryColor}}>SELECT ROLE</T15>
                    </Column></Row>)

    var flowPage = this.state.view.flowPage
    switch(flowPage){
      case 0: return (<Row><Column>
                        <T15 style={{color:commonColor.primaryColor}}>SELECT ROLE</T15>
                      </Column></Row>)
      case 1:
      case 2:
      case 3: return (<Row h={60} style={{borderBottomWidth: 0.2, borderBottomColor:commonColor.primaryColor }}>
                        {titles.slice(1, 4).map( (text, i) => this.buildBullet(flowPage === i + 1, i + 1,  I18n.t( ['signup', 'bullets', text ] ) )) }
                      </Row>)
      case 4:
      case 5:
      case 6: return (<Row h={60} style={{borderBottomWidth: 0.2, borderBottomColor:commonColor.primaryColor }}>
                        {titles.slice(4, 7).map( (text, i) => this.buildBullet(flowPage === i + 4, i + 4,  I18n.t( ['signup', 'bullets', text ] ) )) }
                      </Row>)
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



export default connect(mapStateToProps)(ForgotPassword);
