import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Text, List, Left, Right,   Body, ListItem, Thumbnail,  Button, Badge } from "native-base";
import { NavigationActions } from "react-navigation";
import data from "./data";
import styles from "./style";
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'

const profileImg = require("../../assets/contacts/yo.png");
const userData = [
  {
    thumbnail: profileImg,
    name: "Roberto Rodriguez",
    description: "View your profile",
    link: "Profile"
  }
];

const menuItems = [
  {
    link: "SecureDocs",
    icon: "key",
    text: "My Secure Documents",
    bg: theme.primaryColor
  },
  {
    link: "AppliedJobs",
    icon: "address-card-o",
    text: "My Job Applications",
    bg: "#ffa07a"
  },
  {
    link: "Home",
    icon: "truck",
    text: "Job Suggestions",
    bg: "#9acd32"
  },
  {
    link: "NearbyFriends",
    icon: "hand-o-right",
    text: "Contact Suggestions",
    bg: "#fc6c85"
  },
  {
    link: "BlankPage",
    icon: "fax",
    text: "Invite from contact list",
    bg: "#ffb66c"
  },
  {
    link: "About",
    icon: "university",
    text: "About TruckerIn",
    bg: theme.secondaryColor
  },
  {
    link: "ContactUs",
    icon: "envelope",
    text: "Contact Us",
    bg: 'red'
  },
  {
    link: "Settings",
    icon: "gear",
    text: "Settings",
    bg: 'grey'
  }
];

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class SideBar extends Component {
  static propTypes = {
    closeDrawer: React.PropTypes.func
  };
  render() {
    const navigation = this.props.navigation;

    var showRecentContacts = false; //TODO

    return (
      <Container>
        <Content fullscreen style={styles.drawerContent}>
          <View style={styles.headerView}>
            <View style={styles.searchBlockView}>
            </View>
          </View>
          <List
            dataArray={userData}
            renderRow={userDataRow =>
              <ListItem
                button
                thumbnail
                noBorder
                onPress={() => navigation.navigate(userDataRow.link)}
                style={styles.userDataListitem}
              >
                <Left>
                  <Thumbnail square source={userDataRow.thumbnail} />
                </Left>
                <Body style={{ borderBottomWidth: 0 }}>
                  <Text style={styles.userDataNameText}>
                    {userDataRow.name}
                  </Text>
                  <Text style={styles.userDataDescriptionText}>
                    {userDataRow.description}
                  </Text>
                </Body>
                <Right style={{ borderBottomWidth: 0, paddingLeft: 5 }}>
                  <Icon
                    name="chevron-right"
                    style={styles.userDataArrowIcon}
                  />
                </Right>
              </ListItem>}
          />

          <View style={styles.menuHeadView}>

            <List
              dataArray={menuItems}
              renderRow={menuItemRow =>
                <ListItem
                  button
                  iconLeft
                  noBorder
                  style={{ paddingTop: 8, paddingBottom: 4 }}
                  onPress={() => {
                    navigation.navigate(menuItemRow.link);
                  }}
                >
                  <View
                    style={{
                      ...styles.menuIconContainerView,
                      ...{ backgroundColor: menuItemRow.bg }
                    }}
                  >
                    <Icon name={menuItemRow.icon} style={styles.menuIcon} />
                  </View>
                  <Text style={styles.menuItemText}>
                    {menuItemRow.text}
                  </Text>
                </ListItem>}
            />
            <ListItem
              button
              iconLeft
              noBorder
              style={{ paddingTop: 5, paddingBottom: 50 }}
              onPress={() => {
                navigation.dispatch(resetAction);
              }}
            >
              <View
                style={{
                  ...styles.menuIconContainerView,
                  ...{ backgroundColor: "#c0c0c0" }
                }}
              >
                <Icon name="sign-out" style={styles.menuIcon} />
              </View>
              <Text style={styles.menuItemText}>Log Out</Text>
            </ListItem>
          </View>

          {showRecentContacts &&
          <View style={styles.contactListView}>
            <Text style={styles.menuHeaderText}>Recent Contacts</Text>
            <List
              removeClippedSubviews={false}
              dataArray={data}
              renderRow={dataRow =>
                <ListItem
                  thumbnail
                  noBorder
                  style={{ paddingTop: 2, paddingBottom: 2 }}
                >
                  <Left>
                    <Thumbnail small source={dataRow.thumbnail} />

                    <Text style={[styles.menuItemText, { marginLeft: -3 }]}>
                      {dataRow.name}
                    </Text>
                  </Left>
                  <Body style={{ borderBottomWidth: 0 }} />
                  <Right style={{ borderBottomWidth: 0, paddingLeft: 5 }}>
                    <Badge success />
                  </Right>
                </ListItem>}
            />
          </View>
        }
        </Content>
      </Container>
    );
  }
}

export default SideBar;
