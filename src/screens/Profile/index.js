import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Button,
  Icon,
  Input,
  Thumbnail,
  H2,
  CardItem,
  Left,
  Body,
  Right,
  Footer
} from "native-base";
import styles from "./styles";

const coverImg = require("../../../assets/cover.png");
const profileImg = require("../../../assets/contacts/sanket.png");
const editPostImg = require("../../../assets/edit-post.png");
const editAccInfImg = require("../../../assets/edit-acc-inf.png");
const activityLogImg = require("../../../assets/activity-log.png");
const moreImg = require("../../../assets/more.png");
const workImg = require("../../../assets/work.png");
const academicsImg = require("../../../assets/academics.png");
const followingImg = require("../../../assets/following.png");

class Profile extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header searchBar>
          <Button
            transparent
            style={styles.headerBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" style={styles.headerIcon} />
          </Button>
          <Item style={{ borderRadius: 6, backgroundColor: "#293F68" }}>
            <Icon name="search" style={{ color: "#fff" }} />
            <Input
              placeholderTextColor={"rgba(255,255,255,0.5)"}
              placeholder="Search in Sanket's Posts"
            />
          </Item>
        </Header>

        <Content style={{ backgroundColor: "#fff" }}>
          <View style={styles.coverBlock}>
            <Image source={coverImg} style={styles.coverImage} />
          </View>

          <View>
            <View style={styles.profileImgInnerView}>
              <Image source={profileImg} style={styles.profileImg} />
              <TouchableOpacity>
                <View style={styles.profileImgEditView}>
                  <Icon name="videocam" style={styles.editCamIcon} />
                  <Text style={{ fontSize: 15 }}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileNameContainerView}>
            <H2 style={{ alignSelf: "center" }}>Sanket Sahu</H2>
            <Text style={styles.userNameText}>(sanket.sahu)</Text>
            <Text style={styles.pendingPostText}>42 Pending Posts</Text>
          </View>

          <View style={styles.optionsContainerView}>
            <TouchableOpacity transparent style={styles.optionBtn}>
              <Image source={editPostImg} style={styles.optionImg} />
              <Text style={styles.optionText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity transparent style={styles.optionBtn}>
              <Image source={editAccInfImg} style={styles.optionImg} />
              <Text style={styles.optionText}>Update Info</Text>
            </TouchableOpacity>
            <TouchableOpacity transparent style={styles.optionBtn}>
              <Image source={activityLogImg} style={styles.optionImg} />
              <Text style={styles.optionText}>Activity Log</Text>
            </TouchableOpacity>
            <TouchableOpacity transparent style={styles.optionBtn}>
              <Image source={moreImg} style={styles.optionImg} />
              <Text style={styles.optionText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.introBtnBlock}>
            <Button bordered block style={styles.introBtn}>
              <Icon name="color-wand" style={{ color: "#658ECE" }} />
              <Text style={styles.introText}>Introduce Yourself</Text>
            </Button>
          </View>

          <View style={styles.infoContainerView}>
            <View style={styles.infoBlockView}>
              <Image source={workImg} style={styles.infoIcon} />
              <Text style={styles.infoText}>CEO at GeekyAnts</Text>
            </View>
            <View style={styles.infoBlockView}>
              <Image source={academicsImg} style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Studied at SJB Institute of Technology
              </Text>
            </View>
            <View style={styles.infoBlockView}>
              <Image source={academicsImg} style={styles.infoIcon} />
              <Text style={styles.infoText}>Lives in Bangalore, India</Text>
            </View>
            <View style={styles.infoBlockView}>
              <Image source={followingImg} style={styles.infoIconSmall} />
              <Text style={styles.infoText}>Followed by 3000 people</Text>
            </View>
          </View>

          <View style={styles.nameContainerView}>
            <Thumbnail square source={profileImg} />
            <View style={{ marginTop: 8 }}>
              <Text style={styles.userName2Text}>Sanket Sahu in Poland</Text>
              <Text style={styles.timeText}>Friday at 12:00 PM</Text>
            </View>
          </View>

          <View style={styles.fullWidthImgContainerView}>
            <Image source={coverImg} style={styles.fullWidthImg} />
          </View>
          <View style={styles.commentContainerView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon active name={"thumbs-up"} style={styles.thumbIcon} />
              <Text style={styles.commentContainerLeftText}>
                Suraj and 48 others
              </Text>
            </View>
            <Text style={styles.commentContainerRightText}>3 Comments</Text>
          </View>

          <CardItem style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Left>
              <Button small transparent>
                <Icon
                  name="ios-thumbs-up-outline"
                  style={styles.cardFooterIcons}
                />
                <Text style={styles.cardFooterText}>Like</Text>
              </Button>
            </Left>
            <Body>
              <View>
                <Button small transparent>
                  <Icon
                    name="ios-chatboxes-outline"
                    style={styles.cardFooterIcons}
                  />
                  <Text style={styles.cardFooterText}>Comment</Text>
                </Button>
              </View>
            </Body>
            <Right>
              <Button small transparent>
                <Icon name="ios-redo-outline" style={styles.cardFooterIcons} />
                <Text style={styles.cardFooterText}>Share</Text>
              </Button>
            </Right>
          </CardItem>
        </Content>

        <Footer>
          <Left style={{ alignItems: "center" }}>
            <Button transparent>
              <Text style={styles.footerText}>About</Text>
            </Button>
          </Left>
          <Body style={{ marginLeft: 20 }}>
            <Button transparent>
              <Text style={styles.footerText}>Photos</Text>
            </Button>
          </Body>
          <Right style={{ alignItems: "center" }}>
            <Button transparent>
              <Text style={styles.footerText}>Friends</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

export default Profile;
