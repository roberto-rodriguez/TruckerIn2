import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Text } from "native-base";
import {ContactListItem, nav} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import Search from 'src/components/header/Search'
import theme from 'src/theme/variables/platform'
import * as profileActions from "src/views/profile/profile.actions";


class Connections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameFilter:''
      }
    }

 onSearchChangeText = (text) => this.setState({ nameFilter: text })

 searchHandler = () =>   this.props.loadProfileConnections(0, 0, this.state.nameFilter)


  render() {
    var {isMe, navigation} = this.props

    return (
       <Container>

       <Search title={I18n.t('profile.connections.search')} onChangeText={this.onSearchChangeText} searchHandler={this.searchHandler}/>


       {this.props.connections && this.props.connections.slice(0,5).map( (user, i) => (
         <ContactListItem
             key={i}
             data={user}
             navigation={navigation}
           />))
         }

       <Button full transparent onPress={() => nav(navigation, 'ProfileConnectionList', this.state)}>
         <Text style={{ color: theme.secondaryColor }}>
           {I18n.t('profile.seeMore')}
         </Text>
       </Button>
       </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight:'100%',
    backgroundColor: '#FFF',
    justifyContent: 'flex-start'
  }
});

const mapStateToProps = ({ profileReducer}) =>  ({
  connections: profileReducer.connections
})


  export default connect(mapStateToProps, profileActions)(Connections);
