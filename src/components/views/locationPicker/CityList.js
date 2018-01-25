import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, Spinner, AgentMsg } from "src/components/";
import CityItem from './CityItem'
import theme from 'src/theme/variables/platform';
import  * as locationsActions from './locations.actions'
import { connect } from "react-redux";

class CityList extends Component {

  constructor(props) {
      super(props)
      this.state = {
        loading: false,

        searchStateText: null,
        stateName: null,
        stateId: null,
        cityId: null,

        list:null,
        reset: null
     }
 }

 componentDidMount(){
   debugger;
  // this.listCities()
//  setTimeout(this.listCities, 150)
 }

 componentWillReceiveProps(props) {
   if(this.state.stateId != props.stateId){
     this.listCities( props.stateId )
   }
 }

 listCities = (stateId) => {
   debugger;
   this.setState({
     loading: true,
     stateId,
     list: []
    })

    this.props.listCities(stateId, (list) => {
      debugger;
      this.setState({
        loading: false,
        list
       })
    })
 }

 itemBuilder = (data, navigation, i , shouldUpdate) =>  (
       <CityItem
         key={i} 
         navigation={navigation}
         label={ data.name }
         value={ data.id }
         handler={this.onSelectCity}
         shouldUpdate={shouldUpdate}
       /> )

  loadItems = (page, callback) => callback(this.state.list.slice(page * 20, (page + 1) * 20))

  onSelectCity = (cityId, cityName) => {
    this.setState({ cityId })

    this.props.onSelectCity(cityId, cityName)
  }

  render() {
    const {navigation} = this.props
    var {loading, stateId} = this.state

    if( loading ) return (<Spinner/>)

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
           {stateId ?
            (<Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
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
    params={{callback}}
  />)
}

export default connect(null, locationsActions)(CityList);
