import React, { Component } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, BlockButton, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";

const items = [
  { icon: 'truck',   title: 'Equipment', prop: 'equipment'},
  { icon: 'tachometer',   title: 'Experience', prop: 'experience'}
]

const initialState = {
  locationId:null,
  location: null,
  equipmentId:null,
  equipment: 'Any',
  experienceId: null,
  experience: 'Any',
  author: ''
}

class SearchJobs extends Component {

  constructor(props) {
      super(props)
      this.state = initialState
 }

 componentDidMount(props){
   this.setState((prevState) => ({
     ...prevState,
     ...this.props.navigation.state.params.searchParams
   }))
 }

 clear = () => this.setState(initialState)

 showSelect(prop) {
   this[prop + 'Select'].show();
 }

 setVal = (prop, val, valId) => this.setState( prevState => {
     prevState[prop] = val
     prevState[prop + 'Id'] = valId

     return prevState
   } )

 onSearch = () => {
     var {navigation} = this.props
     debugger;
     navigation.state.params.callback( this.state );
     navigation.goBack();
   }

  render() {
    const {navigation, equipmentOptions, experienceOptions} = this.props;
    var state = this.state

    return (
      <Container>
        <Header navigation={navigation} back title={'Search Jobs'}/>
        <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <ListItem
              navigation={navigation}
               key={101} icon={'map-marker'}
               label={'Where'}
               value={ (state.location && state.location.locationName ) || 'Anywhere'}
               routeName={'LocationPicker'}
               params={{setVal: this.setVal, data: state.location }}/>
            {
              items.map( ({icon, title, prop, isSelect}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={title}
                 value={ state[prop]}
                 handler={ () => this.showSelect( prop ) }
                 />) )

            }
            <InputListItem icon='user-o' label="Employer's Name" value={state.author} onChangeText={(text) => this.setVal('author', text)}/>

            <Button onPress={this.clear} full transparent>
                <Text style={{ color: global.secondaryColor }}>
                  Clear
                </Text>
              </Button>
         </View>

          <BlockButton text='Search' onPress={this.onSearch}/>

           <Select
              ref={o => this.equipmentSelect = o}
              options={ equipmentOptions}
              onPress={(i) => this.setVal('equipment', equipmentOptions[i].name, equipmentOptions[i].id)}
            />
            <Select
               ref={o => this.experienceSelect = o}
               options={ experienceOptions}
               onPress={(i) => this.setVal('experience', experienceOptions[i].name, experienceOptions[i].id)}
             />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  equipmentOptions: [{id:0, name:'Any'}, ...globalReducer.config.equipmentOptions] ,
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : 'At least ' + exp.name}))
});

export default connect(mapStateToProps)(SearchJobs);
