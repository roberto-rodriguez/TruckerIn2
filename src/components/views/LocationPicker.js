import React, { Component } from "react";
import { StyleSheet,Image,View , Text, ScrollView} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T11, T12, T13, Column,PlainListItem, Spinner} from 'src/components/'
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
        stateId: null,
        cityId: null,
        location: null,
        usStates: null,
        statesText: null
     }
 }

 componentDidMount(){
   var params = this.props.navigation.state.params || {}
   var _this = this

  setTimeout(this.filterStates, 100)
 }

 filterStates = (text) => {
   if(text){
     this.setState({
       usStates: this.props.usStates.filter((o) => o.name.indexOf( text ) >= 0)
     })

   }else{
     this.setState({
       usStates: this.props.usStates,
       loading: false
      })
   }
 }

 listStates = () => this.props.listStates(this.state.statesText, (items) => this.setState({items}))


  render() {
    debugger;
    const navigation = this.props.navigation;
    // var {setVal, showAnywareOption} = navigation.state.params

    var {loading, usStates} = this.state

    var setVal = ()=>{}
    var showAnywareOption = null

    callback = (locationId, location) => {}// setVal('location', location, locationId)

    return (
      <Container>
        <Header navigation={navigation} back title={'Select Location'} />
        <Header navigation={navigation}
          left={<SearchLabel label={'State: '} />}
          title={'Select State'}
          searchHandler={() => alert('Searching')}
          onSearchChangeText={this.filterStates}
        />
        <Header navigation={navigation} left={<SearchLabel label={'City: '} />}  title={'Select City (optional)'} searchHandler={() => alert('Searching')}/>

      {loading ? (<Spinner/>) : (
        <Content fullscreen >

              <ScrollView
                scrollEventThrottle={160}
                contentContainerStyle={{marginBottom: 40}}
                showsVerticalScrollIndicator={false}
                centerContent={true}
                scrollsToTop={false}
                stickyHeaderIndices={[]}  >

                {
                  showAnywareOption && (
                    <PlainListItem
                      key={-1}
                      navigation={navigation}
                      label={ 'Anywhere' }
                      value={ 0 }
                      style={{color:'red'}}
                      params={{callback}}
                    />
                  )
                }

                {this.state.usStates.map( (d, i) => (
                  <PlainListItem
                    key={i}
                    navigation={navigation}
                    label={ d.name }
                    value={ d.id }
                    params={{callback}}
                  />))
                }
               </ScrollView>


        </Content>

      ) }
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
