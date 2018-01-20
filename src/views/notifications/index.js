import React, { Component } from "react";
import { Text, Image } from "react-native";
import {Container, Content, Thumbnail, Left, Right, Body, List, ListItem } from "native-base";
import {Header} from 'src/components/'

import data from "./data";
import styles from "./styles";
const chatContactsImg = require("../../../assets/chatcontacts.png");

class Notifications extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content style={styles.content}>
        <Header navigation={navigation} back title='Notifications'/>

          <List
            removeClippedSubviews={false}
            dataArray={data}
            renderRow={dataRow =>
              <ListItem
                button
                thumbnail
                style={{
                  ...styles.listItem,
                  ...{ backgroundColor: dataRow.bg }
                }}
              >
                <Left>
                  <Thumbnail square source={dataRow.thumbnail} />
                </Left>
                <Body>
                  <Text style={styles.nameText}>
                    {dataRow.post}
                  </Text>
                  <Text style={styles.timeText}>
                    {dataRow.time}
                  </Text>
                </Body>
                <Right />
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default Notifications;
