import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Container, Text, Spinner } from "native-base";
import {ContactListItem, nav, AgentMsg} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import Search from 'src/components/header/Search'
import theme from 'src/theme/variables/platform'
import * as profileActions from "src/views/profile/profile.actions";


class Connections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      request: {},
      list: [],
      loading: true
     }
   }

   componentDidMount(){
     var request =  {
       limit: 10,
       params: {'sender.id': this.props.userId}
     }

     this.props.loadProfileConnections(request, (list) => {
       this.setState({
         loading: false,
         list,
         request
       })
     })
   }

 componentWillReceiveProps(newProps){
   if(newProps.headerError){
     this.setState({loading: false})
   }
 }

 onSearchChangeText = (text) => this.setState(prevState => {
    prevState.request.params['receiver.firstName@or@receiver.lastName'] = text
    return prevState
 })

 searchHandler = () => {
   this.setState({ loading: true})

   this.props.loadProfileConnections(this.state.request, (list) => {
     this.setState({
       loading: false,
       list
     })
   })
 }


  render() {
    var {isMe, navigation} = this.props
    var {list, loading, request} = this.state

    if(loading) return (<Spinner color={theme.secondaryColor} style={{marginTop: 10}}/>)

    searchDefaultValue = request && request.params && request.params['receiver.firstName@or@receiver.lastName']

    if(!searchDefaultValue && (!list || list.length === 0)){
      if(isMe){
        return (<AgentMsg text={'Hey ' +  this.props.name  + I18n.t('profile.connections.isMeNoConnections')}/>)
      }else{
        return (<AgentMsg text={I18n.t('profile.connections.noConnections')}/>)
      }
    }



    return (
        <View>

        <Search title={I18n.t('profile.connections.search')}
          onChangeText={this.onSearchChangeText}
          searchHandler={this.searchHandler}
        searchDefaultValue={searchDefaultValue}/>


         {list && list.map( (user, i) => (
           <ContactListItem
               key={i}
               data={user}
               navigation={navigation}
             />))
         }

         {
           (list && list.length > 6 ) && (
             <Button full transparent onPress={() => nav(navigation, 'ProfileConnectionList', this.state.request.params)}>
               <Text style={{ color: theme.secondaryColor }}>
                 {I18n.t('profile.seeMore')}
               </Text>
             </Button>
           )
         }
       </View>

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

const mapStateToProps = ({ globalReducer, profileReducer}, ownProps) => {
  var {id, isMe} = ownProps
  var profileInfo = isMe ? globalReducer.profileInfo : (profileReducer[id] || {}).profileInfo;

  profileInfo = profileInfo || {}

  return {
    userId: id,
    name: profileInfo.firstName,
    headerError: globalReducer.view.headerError
  }
}

  export default connect(mapStateToProps, profileActions)(Connections);
