import React, { Component } from "react";
import { View  } from "react-native";
import { Container } from "native-base";
import {  Row, Column, TransparentButton, Header, Feed} from 'src/components/'
import I18n from 'react-native-i18n'
import PendingRequestItem from './PendingRequestItem'
import theme from 'src/theme/variables/platform'

import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";

class PendingRequestList extends Component {

    loadItems = (page, callback) => this.props.listPendingRequest(page, callback)

    itemBuilder = (user, navigation, i, shouldUpdate) => (<PendingRequestItem
                    key={i}
                    data={user}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  acceptAll = () => this.props.updateUserRelation(null, 'acceptAll', this.onGoBack)

  // acceptAll = () => this.props.answerContactRequest(0, null, true, () => {
  //       var onPendingRequestCallback = props.navigation.state.params && props.navigation.state.params.onPendingRequestCallback
  //       onPendingRequestCallback && onPendingRequestCallback()
  //       props.navigation.goBack()
  // }  )

  onGoBack = () => {
    var {props} = this
    debugger;
    var onPendingRequestCallback = props.navigation.state.params && props.navigation.state.params.onPendingRequestCallback
    onPendingRequestCallback && onPendingRequestCallback()
    props.navigation.goBack()
  }

  render() {
    var {isMe, navigation, pendingRequest} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={I18n.t('contacts.pending.title')}
           navigation={navigation}
           onBack={this.onGoBack}
         />
           <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}>
              <Row h={60} style={{borderBottomColor: theme.secondaryColor, borderBottomWidth: 1}}>
                 <Column h={60}>
                  <TransparentButton color text={I18n.t('contacts.pending.acceptAll')} style={{paddingTop:4 }}
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
