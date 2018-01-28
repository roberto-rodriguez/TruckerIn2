import React, { Component } from "react";
import { View } from "react-native";
import { Container } from "native-base";
import I18n from 'react-native-i18n'
import { ContactListItem, Header, Feed} from 'src/components/'
import HeaderBtn from 'src/components/header/buttons/HeaderBtn'

import * as contactActions from "src/views/contacts/contacts.actions";
import { connect } from "react-redux";

class SearchResults extends Component {

    loadItems = (page, callback) => this.props.searchContacts( page, this.props.searchParams, callback)

    itemBuilder = (user, navigation, i, shouldUpdate) => (<ContactListItem
                    key={i}
                    data={user}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  render() {
    var {navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={I18n.t('contacts.search.results')}
           navigation={navigation}
           right={<HeaderBtn icon='search' handler={this.props.goToSearch}/>}
         />
          <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}>
          </Feed>
        </View>
      </Container>
    )
  }
}


  export default connect(null, contactActions)(SearchResults);
