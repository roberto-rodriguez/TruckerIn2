import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, Spinner, AgentMsg } from "src/components/";
import CityItem from './CityItem'
import theme from 'src/theme/variables/platform';
import  * as locationsActions from './locations.actions'
import { connect } from "react-redux";
import LocationSearch from './LocationSearch'


class CityList extends Component {

  constructor(props) {
      super(props)
      this.state = {
        loading: false,

        searchText: null,
        list:null,
        currentList: null,
        reset: null
     }
 }


 shouldComponentUpdate(nextProps, nextState){
   var {loading, reset} = this.state
   debugger;
    return loading || nextState.reset || this.props.stateId != nextProps.stateId

 }

 componentWillReceiveProps(newProps) {
   debugger;
   if(this.props.stateId != newProps.stateId){
     this.listCities( newProps.stateId )
   }
 }

 componentDidMount(){
   if(this.props.stateId && !this.state.list){
     this.listCities( this.props.stateId )
   }
 }

 listCities = (stateId) => {
   debugger;
   this.setState({
     loading: true,
     list: [],
     searchText: null
    })

    this.props.listCities(stateId, (list) => {
      this.setState({
        ...this.state,
        loading: false,
        list,
    //    reset: true
       })
    })
 }

 onSearchChangeText = (searchText) => {
     this.setState({searchText})
 }

 doSearch = (searchText) => {
        this.setState({reset: true})
 }

 itemBuilder = (data, navigation, i , shouldUpdate) =>  (
       <CityItem
         key={i}
         navigation={navigation}
         label={ data.name }
         value={ data.id }
         handler={this.props.onSelectCity}
         shouldUpdate={shouldUpdate}
       /> )


  loadItems = (page, callback) => {
         debugger;
    var {searchText, list} = this.state

    var filteredList = []

    if(searchText){
      filteredList = this.state.list.filter((o) => o.name.toLowerCase().indexOf( searchText ) >= 0)
    }else{
      filteredList = list || []
    }


    callback( filteredList.slice(page * 20, (page + 1) * 20))

    this.setState({ reset: false, loading: false, searchText})
  }


  render() {
     debugger;
    const {navigation, stateId} = this.props
    var {loading, list} = this.state

    if( loading ) return (<Spinner/>)
    var showFeed = stateId &&  list && list.length > 0

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
           <LocationSearch
             title={'Search Cities'}
             onSearchChangeText={this.onSearchChangeText}

             searchHandler={this.doSearch}/>
         {showFeed ?
            (<Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
              searchText={this.state.searchText}
              reset={this.state.reset}>
              {this.anyCityItem()}
            </Feed>) :
            <AgentMsg text={'Please select state first'}/>
          }
        </View>
      </Container>
    );
  }

  anyCityItem = () => (<CityItem
    key={-1}
    navigation={this.props.navigation}
    label={ 'Any City' }
    value={ 0 }
    style={{color:'red'}}
    handler={this.props.onSelectCity}
  />)
}

const mapStateToProps = ({locationReducer}, ownProps) => {
  debugger;
  return  ({
    stateId: locationReducer.stateId,
    timestamp: locationReducer.timestamp
    })
}


export default connect(mapStateToProps, locationsActions)(CityList);
