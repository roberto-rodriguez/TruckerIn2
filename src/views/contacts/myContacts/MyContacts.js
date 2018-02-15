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

     constructor(props){
       super(props)
       this.state = {
         reset: false
       }
     }

  itemBuilder = (data, navigation, i , shouldUpdate) => (
    <ContactListItem navigation={navigation}  key={i} data={data} shouldUpdate={shouldUpdate}/>
  )

  loadItems = (page, callback) => {
    this.props.listMyContacts(page, callback)

    if(this.state.reset){
      this.setState({reset: false})
    }
  }

  render() {
    const {navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%', paddingBottom: 50}}>
          {
            <Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
              reset={this.state.reset} >

              {this.buildHeader()}

            </Feed>
          }
        </View>
      </Container>

    );
  }

  onPendingRequestCallback = () => setTimeout(() => this.setState({reset: true}), 300)

  buildHeader(){
      var {pendingRequest,connections, navigation} = this.props

     if(pendingRequest > 0){
      return (<PendingRequestHeader navigation={navigation} onPendingRequestCallback={this.onPendingRequestCallback}/>)
    }else{
      if(!connections){
          return <NoConnectionsHeader/>
      }else{
        return null;
      }
    }
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
