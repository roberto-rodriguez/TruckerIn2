import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  ListItem,
  Radio
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      surname: "",
      mobileoremail: "",
      reentermobileoremail: "",
      password: ""
    };
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.background}>
        <Content>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
          </View>
          <View style={styles.formContainerView}>
            <Grid>
              <Col style={{ paddingRight: 10 }}>
                <Item borderType="underline" style={styles.inputGrp}>
                  <Input
                    placeholder="First Name"
                    placeholderTextColor={commonColor.lightTextColor}
                    onChangeText={firstname => this.setState({ firstname })}
                    style={{ color: "#000" }}
                  />
                </Item>
              </Col>
              <Col style={{ paddingLeft: 10 }}>
                <Item borderType="underline" style={styles.inputGrp}>
                  <Input
                    placeholder="Surname"
                    placeholderTextColor={commonColor.lightTextColor}
                    onChangeText={surname => this.setState({ surname })}
                    style={{ color: "#000" }}
                  />
                </Item>
              </Col>
            </Grid>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="Mobile number or email address"
                placeholderTextColor={commonColor.lightTextColor}
                onChangeText={mobileoremail => this.setState({ mobileoremail })}
                style={{ color: "#000" }}
              />
            </Item>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="Re-enter mobile number or email address"
                placeholderTextColor={commonColor.lightTextColor}
                onChangeText={reentermobileoremail =>
                  this.setState({ reentermobileoremail })}
                style={{ color: "#000" }}
              />
            </Item>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="New password"
                placeholderTextColor={commonColor.lightTextColor}
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                style={{ color: "#000" }}
              />
            </Item>
            <Grid style={{ marginVertical: 2 }}>
              <Col>
                <ListItem
                  style={{
                    paddingRight: 15,
                    marginLeft: 0,
                    borderBottomWidth: 0
                  }}
                >
                  <Radio selected />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: commonColor.contentTextColor
                    }}
                  >
                    Female
                  </Text>
                </ListItem>
              </Col>
              <Col>
                <ListItem
                  style={{
                    paddingLeft: 15,
                    marginLeft: 0,
                    borderBottomWidth: 0
                  }}
                >
                  <Radio selected={false} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: commonColor.contentTextColor
                    }}
                  >
                    Male
                  </Text>
                </ListItem>
              </Col>
            </Grid>
            <Button
              block
              style={styles.createBtn}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ lineHeight: 16, fontWeight: "bold" }}>CREATE</Text>
            </Button>
          </View>
          <View style={styles.footerView}>
            <Button
              transparent
              style={styles.signInBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.signInBtnText}>
                Have an Account already? Sign In
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
