import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import { Container  } from "native-base";
import {StackView, ContactListItem, Row, Header, Feed} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

class ProfileConnectionList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        request: {},
        nameFilter:'',
        reset: false
        }
      }

      componentDidMount(){
        var params = this.props.navigation.state.params

        var request =  {
          limit: 20,
          params
        }

        this.setState((prevState) => ({
          // reset: true,
          request
        }))
      }

      onSearchChangeText = (text) => this.setState(prevState => {
         prevState.request.params['receiver.firstName@or@receiver.lastName'] = text
         return prevState
      })

     searchHandler = () => {
       this.setState((prevState) => ({
         ...prevState,
         reset: true
       }))
     }

    loadItems = (page, callback) => {
      var {reset, request} = this.state

      request.page = page

      this.props.loadProfileConnections(request, callback, reset)

      if(reset){
        this.setState({reset: false})
      }
    }

    itemBuilder = (user, navigation, i, shouldUpdate) => (<ContactListItem
                    key={i}
                    data={user}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  render() {
    var { navigation} = this.props

    return (
      <Container white>
          <Header back
           title={I18n.t('profile.connections.search') }
           navigation={navigation}
           searchHandler={this.searchHandler}
           onSearchChangeText={this.onSearchChangeText}
           searchDefaultValue={this.state.nameFilter}
         />
          <Feed reset={this.state.reset} feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
 
      </Container>


    );
  }
}


  export default connect(null, profileActions)(ProfileConnectionList);
