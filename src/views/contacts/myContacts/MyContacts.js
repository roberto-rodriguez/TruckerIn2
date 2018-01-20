import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, ContactListItem } from "src/components/";

import PendingRequestHeader from './headers/PendingRequestHeader'
import NoConnectionsHeader from './headers/NoConnectionsHeader'

import theme from 'src/theme/variables/platform';

import { connect } from "react-redux";
import * as contactActions from "src/views/contacts/contacts.actions";


class MyContacts extends Component {

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <ContactListItem navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate} connectionStatus={1}/>
  )

  loadItems = (page, callback) => this.props.searchContacts(page, {userId: this.props.userId}, callback, null)

  render() {
    const {navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          {
            <Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation} >

              {this.buildHeader()}

            </Feed>
          }
        </View>
      </Container>

    );
  }

  buildHeader(){
      var {pendingRequest,connections, navigation} = this.props

      // if(pendingRequest){
      return (<PendingRequestHeader navigation={navigation}/>)
      // }else{
      //   if(!connections){
          //   return <NoConnectionsHeader/>
        // }else{
        //   return null;
        // }
      // }
  }
}

const styles = StyleSheet.create({
    header:{
      marginTop: 7,
      backgroundColor:'white',
      borderColor: theme.secondaryColor,
      borderBottomWidth: 0.3
    }
  })

  const mapStateToProps = ({globalReducer}) => ({
    userId: globalReducer.profileInfo.id,
    pendingRequest: globalReducer.profileInfo.pendingRequest,
    connections: globalReducer.profileInfo.connections
  });

  export default connect(mapStateToProps, contactActions)(MyContacts);
