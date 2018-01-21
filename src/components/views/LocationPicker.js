import React, { Component } from "react";
import { StyleSheet,Image,View , Text, ScrollView} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T11, T12, T13, Column,PlainListItem} from 'src/components/'

const mockData = [
  {id:1, name: 'Atlanta, GA'},
  {id:2, name: 'Miami, FL'},
  {id:3, name: 'New York, NY'},
  {id:4, name: 'Fourt Loudardale, FL'},
  {id:5, name: 'West Palm Beach, FL'}
]



class LocationPicker extends Component {


  render() {
    const navigation = this.props.navigation;
    var setVal = navigation.state.params && navigation.state.params.setVal
debugger;
    callback = (locationId, location) => setVal('location', location, locationId)

    return (
      <Container>
        <Header navigation={navigation} back title={'Select Location'} />
        <Header navigation={navigation} left={<SearchLabel label={'State: '} />}  title={'Select State'} searchHandler={() => alert('Searching')}/>
        <Header navigation={navigation} left={<SearchLabel label={'City: '} />}  title={'Select City (optional)'} searchHandler={() => alert('Searching')}/>
        <Content fullscreen >
        <ScrollView
          scrollEventThrottle={160}
          contentContainerStyle={{marginBottom: 40}}
          showsVerticalScrollIndicator={false}
          centerContent={true}
          scrollsToTop={false}
          stickyHeaderIndices={[]}  >

          <PlainListItem
            key={-1}
            navigation={navigation}
            label={ 'Anywhere' }
            value={ 0 }
            style={{color:'red'}}
            params={{callback}}
          />

          {
            mockData.map( (d, i) => (
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

//  <PlainListItem navigation={navigation} label={'Atlanta, GA'}  params={{callback: updateLocation}}/>
const styles = StyleSheet.create({
    icon: {
      fontSize: 20
    }
  })

export default LocationPicker;
