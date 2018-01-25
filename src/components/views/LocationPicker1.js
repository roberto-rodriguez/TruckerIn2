import React, { Component } from "react";
import { StyleSheet,Image,View , Text, ScrollView} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T11, T12, T13, Column,PlainListItem, Spinner, Feed} from 'src/components/'
import { connect } from "react-redux";
import  * as locationsActions from './locations.actions'

const mockData = [
  {id:1, name: 'Atlanta, GA'},
  {id:2, name: 'Miami, FL'},
  {id:3, name: 'New York, NY'},
  {id:4, name: 'Fourt Loudardale, FL'},
  {id:5, name: 'West Palm Beach, FL'}
]



class LocationPicker extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: true,

        searchStateText: null,
        searchCityText: null,

        stateName: null,
        cityName: null,

        stateId: null,
        cityId: null,

        location: null,

        list:null,
        cities:[]
      //  , usStates: null
     }
 }

 componentDidMount(){
   var params = this.props.navigation.state.params || {}
   var _this = this

  setTimeout(this.filterStates, 100)
 }

filterCities = (text) => {
   if(text && text.length > 1){
     text = text.toLowerCase()

     this.setState({
       loading: true
      })

     var newList = this.state.cities.filter((o) => o.name.toLowerCase().indexOf( text ) >= 0)
     this.setState({
       searchCityText: text,
       list: newList,
       loading: false
     })

   }else{
     this.setState({
       list: [],
       loading: false,
       searchCityText: text
      })
   }
 }

filterStates  = (text) => {
   if(text){
     text = text.toLowerCase()
     var newList = this.props.usStates.filter((o) => o.name.toLowerCase().indexOf( text ) >= 0)
     this.setState({
       searchStateText: text,
       list: newList
     })

   }else{
     this.setState({
       list: this.props.usStates,
       loading: false
      })
   }
 }

selectState = (stateId, stateName) => {
  this.setState({
    loading: true,
    stateId,
    stateName,
    searchStateText: stateName,
    searchCityText: '',
    list: []
   })

   this.props.listCities(null, (list) => {
     this.setState({
       loading: false,
       list
      })
   })
}


selectCity = (stateId, stateName) => {

}


itemBuilder = (data, navigation, i , shouldUpdate) => (
  <PlainListItem
    key={i}
    navigation={navigation}
    label={ data.name }
    value={ data.id }
    handler={this.selectState}
    shouldUpdate={shouldUpdate}
  />
)

 loadItems = (page, callback) => callback(this.state.list.slice(page * 10, (page + 1) * 10))

  render() {
    const navigation = this.props.navigation;
    // var {setVal, showAnywareOption} = navigation.state.params

    var {loading, list, stateName, searchStateText, searchCityText} = this.state

    var setVal = ()=>{}
    var showAnywareOption = null

    callback = (locationId, location) => {}// setVal('location', location, locationId)

    return (
      <Container>
        <Header navigation={navigation} back title={'Select Location'} />
        <Header navigation={navigation}
          left={<SearchLabel label={'State: '} />}
          title={'Select State'}
          searchHandler={() => {}}
          searchDefaultValue={searchStateText}
          onSearchChangeText={this.filterStates}
        />
        <Header navigation={navigation}
          left={<SearchLabel label={'City: '} />}
          title={'Select City'}
          searchHandler={() => alert('Searching')}
          searchDefaultValue={searchCityText}
          onSearchChangeText={this.filterCities}
        />

      {loading ?
        (<Spinner/>) : (
        <Feed feedLoader={this.loadItems} feedBuilder={this.itemBuilder} navigation={navigation}/>
      )}
      </Container>
    );
  }
}


class SearchLabel extends Component {
  render() {
    return (
      <View  style={{justifyContent: 'center', alignItems: 'center', width:60}}>
        <Text style={{paddingHorizontal: 5, color:'white' }}>{this.props.label}</Text>
      </View>

    )
  }
}


const mapStateToProps = ({globalReducer}, ownProps) => ({
  usStates: globalReducer.config.usStates
})


export default connect(mapStateToProps, locationsActions)(LocationPicker);
