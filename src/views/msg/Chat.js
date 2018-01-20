
import React, { Component } from "react";
import { Container, Content } from "native-base";
import {Header} from 'src/components'
import { GiftedChat } from "react-native-gifted-chat";
import styles from "./styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as msgActions from 'src/views/msg/msg.actions'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      messages: [],
      isLoadingEarlier: false,
      loadEarlier: true
    };
  }

  componentDidMount(props){
    setTimeout( this.listMsg, 100)
  }

  listMsg = () => {
    var _this = this

    var {convId, id} = this.props.navigation.state.params

    this.setState(previousState => {
      previousState.isLoadingEarlier = true
      return previousState
    } );

    this.props.listMsg(this.state.page, convId, id, (msgList) => {

      _this.setState(prevState => ({
          messages: GiftedChat.prepend(prevState.messages, msgList),
          loadEarlier: msgList && msgList.length === 10,
          isLoadingEarlier: false,
          page: prevState.page + 1
        }));
    })
  }

  onSend = (messages = []) => {
    this.setState(previousState => {
      previousState.messages = GiftedChat.append(previousState.messages, messages)
      return previousState
    });

    var {convId, id} = this.props.navigation.state.params

    if(messages && messages.length){
        this.props.sendMsg( convId, id, messages[0].text)
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header navigation={navigation} back title={navigation.state.params.name}/>
        <Content fullscreen
          scrollEnabled={false}
          extraScrollHeight={-13}
          contentContainerStyle={styles.contentChatView}
        >
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.listMsg}
            isLoadingEarlier={this.state.isLoadingEarlier}
            placeholder={I18n.t('general.typeHere') }
            renderAvatarOnTop={true}
            user={{
              _id: this.props.id
            }}
            bottomOffset={50}
          />
        </Content>
      </Container>
    );
  }
}


  const mapStateToProps = ({profileReducer, globalReducer}) => ({
    id: globalReducer.profileInfo.id
  })


export default connect(mapStateToProps, msgActions)(Chat)
