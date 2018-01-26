import React, { Component } from "react";
import { View , Text, BackHandler} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {  Header}  from 'src/components/'
import { connect } from "react-redux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import  * as locationsActions from './locations.actions'

import TabBar from './TabBar'
import StateList from './StateList'
import CityList from './CityList'

class LocationPicker extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: true,
        pickerPage: 1,

        // stateName: null,
        // cityName: null,

        // stateId: null,
        // cityId: null,
        //
        // location: null,

        list:null,
        // cities:[]
      //  , usStates: null
     }

      this.onBack = this.onBack.bind(this);
 }

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack);

    var {navigation} = this.props

    if(navigation.state.params.data){
      this.props.setLocation( navigation.state.params.data )
    }else{
      this.props.clearLocation()
    }
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
}

 onBack = () => {
   var {cityId, stateId, stateName, cityName, navigation} = this.props

   var locationName = cityId ? (cityName + ', ' + stateId) : stateName

   navigation.state.params.setVal( 'location', {stateId, cityId, stateName, cityName, locationName} )

   this.props.navigation.goBack()

   return true;
 }

  onSelectState = (stateId, stateName) => this.setState({pickerPage: 2})

  onSelectCity = (cityId, cityName) => {
    this.setState(prevState => {
      //if(!cityId.cityId){
      //  prevState.pickerPage = 2
  //    }
      prevState.cityId = cityId
      prevState.cityName = cityName

      return prevState
    })

    //, pickerPage:  2
  }

  onSwipe = (i) => this.setState({pickerPage: i})

  render() {
    const navigation = this.props.navigation;
    // var {setVal, showAnywareOption} = navigation.state.params

    var { pickerPage} = this.state
    var { stateName, cityName} = this.props
    var setVal = ()=>{}
    var showAnywareOption = null

    callback = (locationId, location) => {}// setVal('location', location, locationId)

    return (
      <Container>
        <Header navigation={navigation} back title={'Select Location'} onBack={ this.onBack }/>

        <ScrollableTabView
          style={{paddingTop: 30}}
          renderTabBar={()=><TabBar/>}
          tabBarPosition='overlayTop'
          page={pickerPage}
          prerenderingSiblingsNumber={1}
          onChangeTab={({i}) => this.onSwipe(i)}
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
               key={2}/>
        </ScrollableTabView>

      </Container>
    );
  }
}

const mapStateToProps = ({locationReducer}, ownProps) => ({
  stateId: locationReducer.stateId,
  cityId: locationReducer.cityId,
  stateName: locationReducer.stateName,
  cityName: locationReducer.cityName
  })

export default connect(mapStateToProps, locationsActions )(LocationPicker);
