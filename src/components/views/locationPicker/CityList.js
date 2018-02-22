import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, Spinner } from "src/components/";
import CityItem from './CityItem'
import theme from 'src/theme/variables/platform';
import  * as locationsActions from './locations.actions'
import { connect } from "react-redux";
import LocationSearch from './LocationSearch'
import I18n from 'react-native-i18n'

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

    return reset || loading || nextState.reset || this.props.stateId != nextProps.stateId

 }

 componentWillReceiveProps(newProps) {
   if(
     newProps.stateId && //ADDED this new (net tested yet)
     (this.props.stateId != newProps.stateId)){
     this.listCities( newProps.stateId )
   }
 }

 componentDidMount(){
   if(this.props.stateId && !this.state.list){
     this.listCities( this.props.stateId )
   }
 }

 listCities = (stateId) => {
    if(this.state.loading)return;

   this.setState({
     loading: true,
     list: [],
     searchText: null
    })

    this.props.listCities(stateId, (list) => {
      this.setState({
        ...this.state,
        loading: false,
        list
       })
    })
 }

 onSearchChangeText = (searchText) => {
     this.setState({searchText, reset: true})
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
         MULTIPLE_CITIES={this.props.MULTIPLE_CITIES}
       /> )


  loadItems = (page, callback) => {
    var {searchText, list} = this.state

    var filteredList = []

    if(searchText){
      filteredList = this.state.list.filter((o) => o.name.toLowerCase().indexOf( searchText ) >= 0)
    }else{
      filteredList = list || []
    }


    callback( filteredList.slice(page * 20, (page + 1) * 20))

    setTimeout(() => this.setState({ reset: false, loading: false, searchText}), 1000)


  }


  render() {
    const {navigation, stateId} = this.props
    var {loading, list} = this.state

    if( loading ) return (<Spinner/>)
    var showFeed = stateId &&  list && list.length > 0

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
           <LocationSearch
             title={I18n.t('cmp.loc.searchCity')}
             onSearchChangeText={this.onSearchChangeText}

             searchHandler={this.doSearch}/>
           {showFeed &&
            (<Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
              searchText={this.state.searchText}
              starting={this.state.reset} />
            )
          }
        </View>
      </Container>
    );
  }

  // anyCityItem = () => (<CityItem
  //   key={-1}
  //   navigation={this.props.navigation}
  //   label={ I18n.t('cmp.loc.anyCity')}
  //   value={ 1 }
  //   handler={this.props.onSelectCity}
  // />)
}

const mapStateToProps = ({locationReducer}, ownProps) => {

  return  ({
    stateId: locationReducer.stateId,
    timestamp: locationReducer.timestamp
    })
}


export default connect(mapStateToProps, locationsActions)(CityList);
