import React, { Component } from "react";
import {  Image,View, TouchableOpacity, Text,  StyleSheet } from "react-native";
import { Left, Right,  Content, Icon, Thumbnail,  List } from "native-base";

const commonColor = require("src/theme/variables/commonColor");
const profileImg = require("../../../../../assets/contacts/yo.png");
const live = require("../../../../../assets/live.png");
const photo = require("../../../../../assets/cam.png");
const checkIn = require("../../../../../assets/checkin.png");


class WhatsOnMindView extends Component {

  render() {
    console.log('WhatsOnMindView. render ====================');
    const navigation = this.props.navigation;
    return (
      <View>
        <View style={[styles.whatsOnMindView ]}>
          <Image source={profileImg} style={styles.thumbnail} />

          <TouchableOpacity
            onPress={() => navigation.navigate("CreatePort")}
          >
            <View  style={{ width:'65%'}}>
            <Text style={styles.headerText}>Que estas pensando?</Text>
            <Text style={styles.smallText}>Comparte tus ideas, fotos o experiencias de cada dia... </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.navLinksView}>
          <TouchableOpacity style={styles.navLinkBtn}>
            <Image source={live} style={styles.navLinkIcons} />
            <Text style={styles.navLinkText}>Live</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navLinkBtn,{
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderLeftColor: "rgba(0,0,0,0.1)",
                borderRightColor: "rgba(0,0,0,0.1)"
              }]}>
            <Image source={photo} style={styles.navLinkIcons} />
            <Text style={styles.navLinkText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navLinkBtn}>
            <Image source={checkIn} style={styles.navLinkIcons} />
            <Text style={styles.navLinkText}>Check In</Text>
          </TouchableOpacity>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  whatsOnMindView: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)"
  },
  headerText: {
    color: commonColor.lightTextColor,
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10
  },
  smallText:{
    color: commonColor.lightTextColor,
    fontSize:12,
    marginTop: 10,
    marginLeft: 10,
    width:'100%',
    marginRight:30
  },
  navLinksView: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  navLinkBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  navLinkIcons: {
    height: 17,
    width: 17,
    alignSelf: "center",
    resizeMode: "contain"
  },
  navLinkText: {
    marginLeft: 6,
    color: commonColor.lightTextColor,
    fontSize: 13,
    //fontWeight: "bold",
    textAlign: "center"
  },
  listViewBlock: {
    backgroundColor: "#DDDEE3"
  },
  thumbnail: {
    height: 80,
    width: 80,
    margin:15
  }
});

export default WhatsOnMindView;
