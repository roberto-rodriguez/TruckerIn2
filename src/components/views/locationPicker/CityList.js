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
        list:null,
        reset: null
     }
 }


 shouldComponentUpdate(nextProps, nextState){
   debugger;
    return this.state.loading || this.props.stateId != nextProps.stateId
 }

 componentWillReceiveProps(newProps) {
   debugger;
   if(this.props.stateId != newProps.stateId){
     this.listCities( newProps.stateId )
   }
 }

 componentDidMount(){
    debugger;
   if(this.props.stateId && !this.state.list){
     this.listCities( this.props.stateId )
   }
 }

 listCities = (stateId) => {
   debugger;
   this.setState({
     loading: true,
     list: []
    })

    this.props.listCities(stateId, (list) => {
      this.setState({
        ...this.state,
        loading: false,
        list,
        reset: true
       })
    })
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
    callback( (this.state.list || []).slice(page * 20, (page + 1) * 20))

    this.setState({...this.state, reset: false})
  }


  render() {
     debugger;
    const {navigation, stateId} = this.props
    var {loading} = this.state

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
