import React, { Component } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, BlockButton, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'truck',   title: 'equipment', prop: 'equipment'},
  { icon: 'tachometer',   title: 'exp', prop: 'experience'}
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
        <Header navigation={navigation} back title={I18n.t('jobs.search.title')}/>
        <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <ListItem
              navigation={navigation}
               key={101} icon={'map-marker'}
               label={I18n.t('general.where')}
               value={ (state.location && state.location.locationName ) || I18n.t('general.anywhere')}
               routeName={'LocationPicker'}
               params={{setVal: this.setVal, data: state.location }}/>
            {
              items.map( ({icon, title, prop, isSelect}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={I18n.t(['jobs','post', title])}
                 value={ state[prop]}
                 handler={ () => this.showSelect( prop ) }
                 />) )

            }
            <InputListItem
              icon='user-o'
              label={I18n.t('jobs.search.name')}
              value={state.author} onChangeText={(text) => this.setVal('author', text)}/>

            <Button onPress={this.clear} full transparent>
                <Text style={{ color: global.secondaryColor }}>
                  {I18n.t('jobs.search.clear')}
                </Text>
              </Button>
         </View>

          <BlockButton text={I18n.t('jobs.search.title')} onPress={this.onSearch}/>

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
  equipmentOptions: [{id:0, name: I18n.t('general.any')}, ...globalReducer.config.equipmentOptions] ,
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : I18n.t('general.atLeast') + exp.name}))
});

export default connect(mapStateToProps)(SearchJobs);
