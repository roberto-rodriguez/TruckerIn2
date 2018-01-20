import React, { Component } from "react";
import { StyleSheet,Image,View , Text, TouchableHighlight} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, T11, T12, T13, Column, TransparentButton, ListItem, Select, InputListItem} from 'src/components/'

const items = [
  { icon: 'truck',   title: 'Equipment', prop: 'equipment'},
  { icon: 'tachometer',   title: 'Experience', prop: 'experience'},
  { icon: 'address-card-o',   title: 'Role', prop: 'role'}
]

class Search extends Component {

  constructor(props) {
      super(props)

      this.state = {
        locationId:null,
        location: 'Anywhere',
        equipmentId: null,
        equipment: 'Any',
        experienceId: null,
        experience: 'Any',
        roleId: null,
        role: 'Any',
        name: '',

        equipmentOptions: [  {id:1, name:'Animal Carrier'}, {id:2, name:'Dump Truck'}, {id:3, name:'Hauler'}, {id:4, name:'Tanker'}, {id:5, name:'Tractor'} ],
        experienceOptions: [  {id:1, name:'Any'}, {id:2, name:'At least 6 Months'}, {id:3, name:'At least 1 year'}, {id:4, name:'At least 2 year'}, {id:4, name:'At least 3 year'}, {id:4, name:'At least 5 year'} ],
        roleOptions: [  {id:1, name:'Driver'}, {id:2, name:'Broker'}, {id:3, name:'Company'} ]
       }

 }

 showSelect(prop) {
   this[prop + 'Select'].show();
 }


 setVal(prop, val, valId) {
   debugger;

   if(!val)return;

   var newState = { ...this.state }
   newState[prop] = val

   if(valId){
     newState[prop + 'Id'] = valId
   }

   this.setState(newState)
 }

//TODO remove this class
  render() {
    const navigation = this.props.navigation;
    var title = navigation.state.params && navigation.state.params.title
    var searchUser = navigation.state.params && navigation.state.params.searchUser
    var state = this.state



    return (
      <Container>
        <Header navigation={navigation} back title={title}/>
        <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <ListItem navigation={navigation} key={101} icon={'map-marker'} label={'Where'} value={ state.location} routeName={'LocationPicker'} params={{setVal: (prop, val, valId) => this.setVal(prop, val, valId)}}/>
            {
              items.map( ({icon, title, prop, isSelect}, i) => ( (i < 2 || searchUser) &&
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={title}
                 value={ state[prop]}
                 handler={ () => this.showSelect( prop ) }
                 />) )

            }
            <InputListItem icon='user-o' label='Name' value={state.name} onChangeText={(text) => this.setVal('name', text)}/>

         </View>

          <Button block rounded style={{backgroundColor: global.secondaryColor, width: '90%', marginHorizontal: '5%', marginBottom: 15}} >
               <Icon name='search' style={{color: 'white', marginRight: 10}}/>
               <Text style={{color: 'white'}}>{'Search'}</Text>
           </Button>

           <Select
              ref={o => this.equipmentSelect = o}
              options={ state.equipmentOptions}
              onPress={(i) => this.setVal('equipment', state.equipmentOptions[i].name, state.equipmentOptions[i].id)}
            />
            <Select
               ref={o => this.experienceSelect = o}
               options={ state.experienceOptions}
               onPress={(i) => this.setVal('experience', state.experienceOptions[i].name, state.experienceOptions[i].id)}
             />
             <Select
                ref={o => this.roleSelect = o}
                options={ state.roleOptions}
                onPress={(i) => this.setVal('role', state.roleOptions[i].name, state.roleOptions[i].id)}
              />
        </Content>
      </Container>
    );
  }
}

export default Search;
