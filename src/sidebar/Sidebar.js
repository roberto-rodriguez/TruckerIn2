import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Text, List, Left, Right,   Body, ListItem } from "native-base";
import { Avatar} from 'src/components'
import { NavigationActions } from "react-navigation";
import data from "./data";
import styles from "./style";
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'
import { connect } from "react-redux";

const menuItems = [
  // {
  //   link: "SecureDocs",
  //   icon: "key",
  //   text: "My Secure Documents",
  //   bg: theme.primaryColor
  // },
  {
    link: "AppliedJobs",
    icon: "address-card-o",
    text: "My Job Applications",
    bg: 'steelblue'
  },
  {
    link: "SavedJobs",
    icon: "briefcase",
    text: "My Saved Jobs",
    bg: 'teal'
  },
  // {
  //   link: "Home",
  //   icon: "truck",
  //   text: "Job Suggestions",
  //   bg: "#9acd32"
  // },
  // {
  //   link: "NearbyFriends",
  //   icon: "hand-o-right",
  //   text: "Contact Suggestions",
  //   bg: "#fc6c85"
  // },
  // {
  //   link: "BlankPage",
  //   icon: "fax",
  //   text: "Invite from contact list",
  //   bg: "#ffb66c"
  // },
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
    const {navigation, fullName, profileImg} = this.props

    return (
      <Container >
        <Content fullscreen   style={styles.drawerContent}>
          <ListItem button thumbnail noBorder
            onPress={() => navigation.navigate('Profile')}
            style={styles.userDataListitem} >
            <Left>
               <Avatar name={fullName} size={60} src={profileImg} square/>
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.userDataNameText}>
                {fullName}
              </Text>
              <Text style={styles.userDataDescriptionText}>
                View your profile
              </Text>
            </Body>
            <Right style={{ borderBottomWidth: 0, paddingLeft: 5 }}>
              <Icon
                name="chevron-right"
                style={styles.userDataArrowIcon}
              />
            </Right>
          </ListItem>

          <View style={styles.menuHeadView}>

            <List
              dataArray={menuItems}
              renderRow={menuItemRow =>
                <ListItem
                  button
                  iconLeft
                  noBorder
                  style={styles.item}
                  onPress={() => {
                    setTimeout( () => navigation.navigate( menuItemRow.link) , 300)
                    navigation.navigate('DrawerClose')
                //    navigation.navigate(menuItemRow.link);
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
              style={styles.item}
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

        </Content>
      </Container>
    );
  }
}


function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang,
    fullName: globalReducer.profileInfo.firstName + ' ' + globalReducer.profileInfo.lastName,
    profileImg:  globalReducer.profileInfo.profileImg
  }
}

export default connect(mapStateToProps)(SideBar);
