import React, { Component } from "react";
import { View , Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, BlockButton, ListItem, Select, InputListItem} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'puzzle-piece',   title: 'role', prop: 'role'},
  { icon: 'truck',   title: 'equipment', prop: 'equipment'},
  { icon: 'tachometer',   title: 'experience', prop: 'experience'},
  { icon: 'hourglass-end',   title: 'status', prop: 'jobStatus'}
]

const initialState = {
  location: null,
  equipmentId: null,
  equipment: null,
  experienceId: null,
  experience: null,
  jobStatusId: null,
  jobStatus: null,
  roleId: null,
  role: null,
  name: '',
  showDriverOptions: true
}

class SearchForm extends Component {

  constructor(props) {
      super(props)

      this.state = {...initialState}
 }

 componentDidMount(){
   this.setState((prevState) => ({
     ...prevState,
     ...this.props.searchParams
   }))
 }

 clear = () => this.setState({...initialState})

 showSelect(prop) {
   this[prop + 'Select'].show();
 }


 setVal = (prop, val, valId) => {
   this.setState(prevState => {
     prevState[prop] = val

      prevState[prop + 'Id'] = valId

      if(prop === 'role'){
        prevState['showDriverOptions'] = valId < 2
      }
     return prevState
   })
 }

  render() {
    const {navigation, equipmentOptions, experienceOptions, jobStatusOptions, roleOptions} = this.props;
    var state = this.state

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('contacts.search.title')}/>
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
              items.filter((elem, i) => (state.showDriverOptions || i < 1)).map( ({icon, title, prop, isSelect}, i) => (
              <ListItem
                 key={i}
                 navigation={navigation}
                 icon={icon}
                 label={title ? I18n.t(['contacts', 'search', title]) : I18n.t('general.any')}
                 value={ state[prop]}
                 handler={ () => this.showSelect( prop ) }
                 />) )

            }
            <InputListItem icon='user-o' label={I18n.t('contacts.search.name')} value={state.author} onChangeText={(text) => this.setVal('name', text)}/>

            <Button onPress={this.clear} full transparent>
                <Text style={{ color: global.secondaryColor }}>
                  {I18n.t('contacts.search.clear')}
                </Text>
              </Button>
         </View>

          <BlockButton text={I18n.t('contacts.search.search')} onPress={() => this.props.onSearch(this.state)}/>
          <Select
             ref={o => this.roleSelect = o}
             options={ roleOptions}
             onPress={(i) => this.setVal('role', roleOptions[i].name, roleOptions[i].id)}
           />
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
           <Select
              ref={o => this.jobStatusSelect = o}
              options={ jobStatusOptions}
              onPress={(i) => this.setVal('jobStatus', jobStatusOptions[i].name, jobStatusOptions[i].id)}
            />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  equipmentOptions: [{id:0, name:  I18n.t('general.any')}, ...globalReducer.config.equipmentOptions] ,
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name :  I18n.t('general.moreThan') + exp.name})),
  jobStatusOptions:  [{id:0, name:  I18n.t('general.any')}, ...globalReducer.config.jobStatusOptions],
  roleOptions:  [{id:0, name:  I18n.t('general.any')}, ...globalReducer.config.roleOptions]
});

export default connect(mapStateToProps )(SearchForm);
