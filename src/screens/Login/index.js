import React, { Component } from "react";
import { Image, StatusBar, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  Toast,
  Icon
} from "native-base";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;

class LoginForm extends Component {
  textInput: Any;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} style={styles.inputGrp}>
          <Icon
            active
            name={
              input.name === "email" ? "ios-mail-outline" : "ios-unlock-outline"
            }
            style={{ color: commonColor.contentTextColor }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor={commonColor.lightTextColor}
            style={{ color: commonColor.contentTextColor }}
            placeholder={input.name === "email" ? "Email or Phone" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  login() {
//    if (this.props.valid) {
      this.props.navigation.navigate("Drawer");
    // } else {
    //   Toast.show({
    //     text: "Enter Valid Username & Password!",
    //     duration: 2500,
    //     position: "top",
    //     textStyle: { textAlign: "center" }
    //   });
  //  }
  }

//validate={[alphaNumeric, minLength8, maxLength15, required]}
//validate={[email, required]}

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.backgroundContainer}>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="light-content"
        />
        <Content>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
          </View>
          <View style={styles.formContainerView}>
            <View style={styles.formView}>
              <Field
                name="email"
                component={this.renderInput}
                type="email"
              />
              <Field
                name="password"
                component={this.renderInput}
                type="password"
              />
              <Button
                block
                style={styles.loginBtn}
                onPress={() => this.login()}
              >
                <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                  LOG IN
                </Text>
              </Button>
              <Button
                transparent
                style={{ alignSelf: "center" }}
                onPress={() => navigation.navigate("Drawer")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password? XX</Text>
              </Button>
            </View>
          </View>
          <View style={styles.footerView}>
            <Button
              bordered
              block
              style={styles.createAccountBtn}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.createAccountBtnTxt}>
                CREATE NEW SOCIAL ACCOUNT
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;
