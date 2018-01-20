import React, { Component } from "react";
import { View, Text, ScrollView , TouchableHighlight} from "react-native";
import { Container,  Content, Left, Right, Body, Button, Icon, Thumbnail,  List, ListItem } from "native-base";
import { TransparentButton, Row, Column, Subtitle, SimpleButton, T12, T14 } from "src/components/";

import theme from 'src/theme/variables/platform';
import { NavigationActions } from "react-navigation";
import FriendsSwiper from 'src/components/widgets/FriendsSwiper'
import dataFriendsTraveling from './data2'
import data from "./data";

const commonColor = require("src/theme/variables/commonColor");

const chatNavigateAction = name =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { name: name }
  });

  const profileNavigateAction = userInfo =>
    NavigationActions.navigate({
      routeName: "Profile",
      params: { userInfo }
    });

class Friends extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <ScrollView
        scrollEventThrottle={160}
        contentContainerStyle={{backgroundColor:'white'}}
        showsVerticalScrollIndicator={false}
        centerContent={true}
        scrollsToTop={false} >

        <Row  h={50}>
          <Column  h={50}>
            <TransparentButton active text={'12 Solicitudes Pendientes'} />
          </Column>
        </Row>

        <Subtitle> Personas que quizas conoscas</Subtitle>

        <FriendsSwiper/>

        <Subtitle> Mis Contactos (18)</Subtitle>

        <Content>

          <List
            dataArray={dataFriendsTraveling}
            renderRow={(dataRow,something, i) =>
              <ListItem button thumbnail>
                <Left>
                 <SimpleButton  onPress={()=>navigation.dispatch(profileNavigateAction(dataRow))}>
                    <Thumbnail circle source={dataRow.thumbnail} />
                  </SimpleButton>
                </Left>

                 <Body >
                  <SimpleButton onPress={()=> navigation.dispatch(profileNavigateAction(dataRow))}>
                    <View>
                      <T14>
                        {dataRow.name  }
                      </T14>
                      <T12 light shortLine>
                        {dataRow.location}
                      </T12>
                      <T12 light shortLine>
                        {dataRow.distance}
                      </T12>
                    </View>
                    </SimpleButton>
                  </Body>

                  <Right style={{}}>
                    <TouchableHighlight underlayColor={'transparent'}  onPress={()=>navigation.dispatch(chatNavigateAction(dataRow.name ))}  style={{padding:20}}>
                      <View>
                        <Icon
                          active
                          name="chatbubbles"
                          style={{
                            ...{ color: dataRow.iconColor }
                          }}
                        />
                      </View>
                    </TouchableHighlight>
                </Right>

              </ListItem>}
          />

        </Content>
      </ScrollView>
    );
  }
}

export default Friends;
