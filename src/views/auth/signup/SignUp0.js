import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,   Content, Text, Item, Input, Button, View, ListItem } from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import {BlockButton, AgentImg, T16, T14, Row, Column, T13, T12} from 'src/components/'
import styles from "./styles";

const commonColor = require("src/theme/variables/commonColor");
const logo = require("../../../../assets/logo.png");

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
            <AgentImg size={85}/>
            <T16 style={{color:'white'}}>Welcome to TruckerIn</T16>
            <T14 style={{color:'white'}}>The fastest growing Truckers network</T14>
          </View>

          <Row h={60} style={{borderBottomWidth: 0.2, borderBottomColor:commonColor.primaryColor }}>
            <Column columns={3} h={60}>
              <View  style={styles.selectedBullet}>
                <T12 shortLine strong style={{color:'white'}}>1</T12>
              </View>
              <T12 shortLine strong style={styles.greenColor}>Personal</T12>
            </Column>
            <Column columns={3} h={60}>

              <View  style={[styles.bullet, styles.deselectedBullet]}>
                <T12 shortLine strong style={{color: commonColor.primaryColor}}>2</T12>
              </View>
                <T12 shortLine>Contact</T12>
            </Column>
            <Column columns={3} h={60}>

              <View  style={[styles.bullet, styles.deselectedBullet]}>
                <T12 shortLine strong style={{color: commonColor.primaryColor}}>3</T12>
              </View>
              <T12 shortLine>Experience</T12>
            </Column>
          </Row>

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
                    placeholder="Last Name"
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

          </View>

        </Content>

        <BlockButton text={'Next'} onPress={() => navigation.navigate("Drawer") }/>

      </Container>
    );
  }
}

export default SignUp;
