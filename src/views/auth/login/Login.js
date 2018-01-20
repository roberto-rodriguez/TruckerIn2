import React, { Component } from "react";
import { Image, StatusBar, Platform, ActivityIndicator} from "react-native";
import { Container, Content, Text, Item, Input, Button, View } from "native-base";
import { T16, Column, Row, SimpleButton, mapStateToProps} from 'src/components'
import I18n from 'react-native-i18n'
import styles from "./styles";
import Video from 'react-native-video'

import { connect } from "react-redux";
import * as authActions from "src/views/auth/auth.actions";

const commonColor = require("src/theme/variables/commonColor");
const logo = require("../../../../assets/truckerin.jpg");
const loginVideo = require("../../../../assets/video_login.mp4");

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showError: false,
      logging: false
    };
  }

  setVal = (prop, val) => {
    this.setState(prevState => {
      prevState[prop] = val
      prevState.showError = false
      return prevState
    })
  }

  login = () => {
    var _this = this

    if(this.state.logging)return;

    this.setState(prevState => {
      prevState.logging = true
      return prevState
    })

    this.props.login( this.state.username, this.state.password, ( success ) => {
      if (success) {
        this.props.navigation.navigate("Drawer");
       } else {
           _this.setState(prevState => {
             prevState.showError = true
             prevState.logging = false
             return prevState
           })
      }
    })
  }


  render() {
    const navigation = this.props.navigation;

    var {showError, username, password} = this.state

    return (
      <Container style={styles.backgroundContainer}>
        <StatusBar backgroundColor={ Platform.OS === "android" ? "#4E69A2" : "transparent" } barStyle="light-content" />

        <Content fullscreen>
        <View style={styles.logoContainerView}>

          <Image source={logo} style={styles.imageShadow} />

          {
           this.state.logging ?
            <ActivityIndicator size="large" color={"#EA0000"}/>
            :   <T16 light>{ I18n.t('login.slogan') }</T16>
          }

        </View>

        <View style={styles.formContainerView}>
        <Video
          source={require("../../../../assets/video_login.mp4")}
           rate={1.0}
           volume={1.0}
           muted={false}
           paused={false}
           resizeMode="cover"
           repeat={true}
           style={styles.backgroundVideo} />
          <View style={styles.formView}>

          <BaseTextInput
           name="username"
           showError={showError}
           defaultValue={username}
           onChangeText={(text) => this.setVal('username', text)}/>

          <BaseTextInput
           name="password"
           showError={showError}
           defaultValue={password}
           onChangeText={(text) => this.setVal('password', text)}/>

          <Button
            block
            style={styles.loginBtn}
            onPress={ this.login }
          >
            <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
              { I18n.t('login.login') }
            </Text>
          </Button>

            <Button
              block
              style={styles.loginBtn}
              onPress={() => navigation.navigate( 'Register' )}
            >
              <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                { I18n.t('login.createAccount') }
              </Text>
            </Button>

            <Row h={20}><Column h={20}>
              <SimpleButton onPress={() => navigation.navigate( 'ForgotPasswod' ) }>
                <Text style={{color:'white'}}>{ I18n.t('login.forgotPassword') }</Text>
              </SimpleButton>
            </Column></Row>

          </View>
        </View>
        </Content>
      </Container>
    );
  }
}

class BaseTextInput extends Component {
 render() {
   var {name, showError, defaultValue, onChangeText} = this.props

   return (
     <View>
       <Item style={styles.inputGrp}>
         <Input
           defaultValue={defaultValue}
           ref={c => (this.textInput = c)}
           placeholderTextColor={ showError ? 'red' : commonColor.primaryColor}
           style={[styles.loginField, { color: (showError ? 'red' :  commonColor.contentTextColor)}]}
           placeholder={ name === "username" ? I18n.t('login.username') : I18n.t('login.password')}
           secureTextEntry={ name === "password" ? true : false}
           onChangeText={onChangeText}
         />
       </Item>
     </View>
   )
 }
}


 export default connect(mapStateToProps, authActions)(Login);
