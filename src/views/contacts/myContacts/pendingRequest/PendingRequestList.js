import React, { Component } from "react";
import { View  } from "react-native";
import { Container } from "native-base";
import {  Row, Column, TransparentButton, Header, Feed} from 'src/components/'

import PendingRequestItem from './PendingRequestItem'
import { connect } from "react-redux";
import theme from 'src/theme/variables/platform'
import * as contactActions from "../../reducer/contactActions";

class PendingRequestList extends Component {

    loadItems = (page, callback) => this.props.loadPendingRequest(page, callback)

    itemBuilder = (user, navigation, i, shouldUpdate) => (<PendingRequestItem
                    key={i}
                    data={user}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  acceptAll = () => this.props.answerContactRequest(0, null, true, () => this.props.navigation.goBack())

  render() {
    var {isMe, navigation, pendingRequest} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={'Connection Request'}
           navigation={navigation}
         />
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}>
              <Row h={60} style={{borderBottomColor: theme.secondaryColor, borderBottomWidth: 1}}>
                 <Column h={60}>
                  <TransparentButton color text={'Accept all'} style={{paddingTop:4 }}
                   handler={() => this.acceptAll()} textStyle={{fontSize: 15}}/>
                 </Column>
               </Row>
           </Feed>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = ({  globalReducer}) => ({
  pendingRequest: globalReducer.profileInfo.pendingRequest
})

export default connect(mapStateToProps, contactActions)(PendingRequestList);
