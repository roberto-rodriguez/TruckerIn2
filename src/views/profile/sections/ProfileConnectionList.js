import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import { Container  } from "native-base";
import {StackView, ContactListItem, Row, Header, Feed} from 'src/components/' 
import { connect } from "react-redux";
import * as profileActions from "../reducer/profileActions";


class ProfileConnectionList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nameFilter:'',
        reset:false
        }
      }

      componentDidMount(){
        var nameFilter = this.props.navigation.state.params.nameFilter

        this.setState((prevState) => ({
          reset: true,
          nameFilter
        }))
      }

    onSearchChangeText = (text) => {
      this.setState((prevState) => ({
        ...prevState,
        nameFilter: text
      }))
    }

     searchHandler = () => {
       this.setState((prevState) => ({
         ...prevState,
         reset: true
       }))
     }

    loadItems = (page, callback) => {
      var {reset, nameFilter} = this.state
      this.props.loadProfileConnections(null, page, nameFilter, callback, reset)

      if(reset){
        this.setState((prevState) => ({
          ...prevState,
          reset: false
        }))
      }
    }

    itemBuilder = (user, navigation, i, shouldUpdate) => (<ContactListItem
                    key={i}
                    data={user}
                    navigation={navigation}
                    shouldUpdate={shouldUpdate}
                  />)

  render() {
    var {isMe, navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
          <Header back
           title={'Search Connections'}
           navigation={navigation}
           searchHandler={this.searchHandler}
           onSearchChangeText={this.onSearchChangeText}
           searchDefaultValue={this.state.nameFilter}
         />
          <Feed reset={this.state.reset} feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}>
          </Feed>
        </View>
      </Container>


    );
  }
}


const mapStateToProps = ({ profileReducer}) =>  ({
  connections: profileReducer.connections
})


  export default connect(mapStateToProps, profileActions)(ProfileConnectionList);
