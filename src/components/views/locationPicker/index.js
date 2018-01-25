import React, { Component } from "react";
import { StyleSheet,Image,View , Text, ScrollView} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T11, T12, T13, Column,PlainListItem, Spinner, Feed} from 'src/components/'
import { connect } from "react-redux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import  * as locationsActions from '../locations.actions'

import TabBar from './TabBar'
import StateList from './StateList'
import CityList from './CityList'

class LocationPicker extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: true,
        pickerPage: 0,

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


  onSelectState = (stateId, stateName) => this.setState({pickerPage: 2, stateId, stateName})

  onSelectCity = (cityId, cityName) => this.setState({cityId, cityName})

  render() {
    const navigation = this.props.navigation;
    // var {setVal, showAnywareOption} = navigation.state.params

    var { pickerPage, stateId, stateName, cityName} = this.state

    var setVal = ()=>{}
    var showAnywareOption = null

    callback = (locationId, location) => {}// setVal('location', location, locationId)

    return (
      <Container>
        <Header navigation={navigation} back title={'Select Location'} />

        <ScrollableTabView
          style={{paddingTop: 30}}
          renderTabBar={()=><TabBar/>}
          tabBarPosition='overlayTop'
          page={pickerPage}
          prerenderingSiblingsNumber={1}
          >
            <StateList
              tabLabel={stateName || 'Select State'}
              onSelectState={this.onSelectState}
              navigation={navigation}
              key={1}/>

            <CityList
               tabLabel={cityName || 'Select City'}
               onSelectCity={this.onSelectCity}
               navigation={navigation}
               stateId={stateId}
               key={2}/>
        </ScrollableTabView>

      </Container>
    );
  }
}



export default connect( )(LocationPicker);
