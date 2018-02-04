import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Text, List, Left, Right,   Body, ListItem } from "native-base";
import { Avatar} from 'src/components'
import { NavigationActions } from "react-navigation";
import * as globalActions from "src/boot/reducers/global.actions";
import styles from "./style";
import Icon from 'react-native-fa-icons';
import theme from 'src/theme/variables/platform'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const truckerItems = [
  {
    link: "AppliedJobs",
    icon: "address-card-o",
    text: "myJobApps",
    bg: 'steelblue'
  },
  {
    link: "SavedJobs",
    icon: "briefcase",
    text: "mySavedJobs",
    bg: 'teal'
  }
]

const employerItems = [
  {
    link: "PreCreateJob",
    icon: "edit",
    text: "createJob",
    bg: 'steelblue'
  },
  {
    link: "PostedJobs",
    icon: "tags",
    text: "myPostedJobs",
    bg: 'teal'
  }
]

const menuItems = [
  // {
  //   link: "SecureDocs",
  //   icon: "key",
  //   text: "My Secure Documents",
  //   bg: theme.primaryColor
  // },

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
    text: "about",
    bg: theme.secondaryColor
  },
  {
    link: "ContactUs",
    icon: "envelope",
    text: "contactUs",
    bg: 'red'
  },
  {
    link: "Settings",
    icon: "gear",
    text: "settings",
    bg: 'grey'
  }
];

class SideBar extends Component {
  static propTypes = {
    closeDrawer: React.PropTypes.func
  };

  render() {
    const {navigation, fullName, profileImg, isDriver} = this.props

    var items = isDriver ? truckerItems : employerItems
    items = items.concat( menuItems )

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
                {I18n.t('settings.sidebar.viewProfile')}
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
              dataArray={items}
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
                    {I18n.t(['settings', 'sidebar', menuItemRow.text])}
                  </Text>
                </ListItem>}
            />
            <ListItem
              button
              iconLeft
              noBorder
              style={styles.item}
              onPress={() => {
                navigation.dispatch( globalActions.resetAction );
                this.props.logOut()
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
              <Text style={styles.menuItemText}>{I18n.t('settings.sidebar.logOut')}</Text>
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
    profileImg:  globalReducer.profileInfo.profileImg,
    isDriver: globalReducer.profileInfo.roleId === 1
  }
}

export default connect(mapStateToProps, globalActions)(SideBar);
