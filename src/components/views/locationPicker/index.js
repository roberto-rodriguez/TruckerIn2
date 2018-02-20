import React, { Component } from "react";
import { View , Text, BackHandler} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {  Header, AgentMsg}  from 'src/components/'
import { connect } from "react-redux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import  * as locationsActions from './locations.actions'
import I18n from 'react-native-i18n'
import TabBar from './TabBar'
import StateList from './StateList'
import CityList from './CityList'

class LocationPicker extends Component {

  constructor(props) {
      super(props)

      this.state = {
        pickerPage: 0
     }

      this.onBack = this.onBack.bind(this);
 }

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack);

    var {navigation} = this.props

    if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
      this.props.setLocation( navigation.state.params.data )
    }else{
      this.props.clearLocation()

      if(navigation && navigation.state.params.showGuidance){
        this.props.showGuidance()
      }
    }
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
}

 onBack = () => this.processAndGoBack(this.props.cityId, this.props.cityName)

 processAndGoBack = (cityId, cityName) => {
   var { stateName, stateId, navigation} = this.props

   if(stateId){
     var locationName = cityId ? (cityName + ', ' + stateId) : stateName
     navigation.state.params.setVal( 'location', {stateId, cityId, stateName, cityName, locationName} )
   }

   this.props.navigation.goBack()

   return true;
 }

  onSelectState = (stateId, stateName) => this.setState({pickerPage: 2})

  onSwipe = (i) => this.setState({pickerPage: i})

  render() {
    const navigation = this.props.navigation;
    // var {setVal, showAnywareOption} = navigation.state.params

    var { pickerPage} = this.state
    var { stateName, cityName, hideHeader} = this.props
    var setVal = ()=>{}
    var showAnywareOption = null

    callback = (locationId, location) => {}// setVal('location', location, locationId)

    return (
      <Container>
        {!hideHeader && (  <Header navigation={navigation} back title={I18n.t('cmp.loc.title')} onBack={ this.onBack }/>)} 

        <ScrollableTabView
          style={{paddingTop: 30}}
          renderTabBar={()=><TabBar/>}
          tabBarPosition='overlayTop'
          page={pickerPage}
          prerenderingSiblingsNumber={1}
          onChangeTab={({i}) => this.onSwipe(i)}
          >
            <StateList
              tabLabel={stateName || I18n.t('cmp.loc.selectState') }
              onSelectState={this.onSelectState}
              navigation={navigation}
              key={1}/>

            <CityList
               tabLabel={cityName || I18n.t('cmp.loc.selectCity')}
               onSelectCity={this.processAndGoBack}
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
  stateName: locationReducer.state || locationReducer.stateName,
  cityName: locationReducer.city || locationReducer.cityName
  })

export default connect(mapStateToProps, locationsActions )(LocationPicker);
