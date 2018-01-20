import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, FlatList } from "react-native";
import { Container, Content, Icon, ListItem, Header, Left, Right, Body, Title, Button, Thumbnail } from "native-base";

import { connect } from "react-redux"; 
import { itemsFetchData } from "src/actions";
import datas from "./data.json";
import styles from "./styles";
const profileImg = require("../../../assets/contacts/yo.png");
const chatContactsImg = require("../../../assets/chatcontacts.png");

class Settings extends Component {
  componentDidMount() {
    this.props.fetchData(datas);
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.settingsContainerView}>
        <ListItem style={{ marginTop: 7 }} icon>
          <Left>
            <View
              style={{
                ...styles.iconContainerView,
                ...{ backgroundColor: item.bg }
              }}
            >
              <Icon
                name={item.icon}
                style={{
                  ...styles.optionIcon,
                  left: item.last ? 8 : item.divider ? 3 : undefined
                }}
              />
            </View>
          </Left>
          <Body>
            <Text>
              {item.name}
            </Text>
          </Body>
          <Right />
        </ListItem>
      </View>
    );
  };
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}
            >
              <Image source={chatContactsImg} style={styles.headerIcon} />
            </Button>
          </Right>
        </Header>

        <Content style={styles.content}>
          <TouchableOpacity
            style={styles.nameContainerBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Thumbnail circle source={profileImg} />
            <View style={styles.nameContainerView}>
              <Text style={styles.userNameText}>Roberto Rodriguez</Text>
              <Text style={styles.viewProfileText}>Edit your Profile</Text>
            </View>
            <Icon name="arrow-forward" style={styles.arrowForwardIcon} />
          </TouchableOpacity>
          <FlatList
            data={this.props.items}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
          />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.settingsReducer.items,
  hasErrored: state.settingsReducer.hasErrored,
  isLoading: state.settingsReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(Settings);
