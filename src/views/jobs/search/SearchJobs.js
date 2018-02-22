import React, { Component } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import { Header, BlockButton, ListItem, Select, InputListItem, OptionsListItem, Spinner} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'truck',   title: 'equipment', prop: 'equipment'},
  { icon: 'tachometer',   title: 'exp_less_than', prop: 'experience'}
]

const initialState = {
  orderby: 1,
  categoryId: null,
  distanceId: null,
  location: null,
  equipmentId:null,
  equipment: null,
  experienceId: null,
  experience: null,
  author: ''
}

class SearchJobs extends Component {

  constructor(props) {
      super(props)
      this.state = {
        mounted: false,
        data: {orderby: 1}// initialState
      }
 }

 componentDidMount(props){
   setTimeout(() =>  this.setState((prevState) => ({
      ...prevState,
      mounted: true,
      data:{
        ...prevState.data,
        ...this.props.navigation.state.params.searchParams
      }
    })), 100)
 }

 clear = () => this.setState({data:initialState})

 t = (key) => I18n.t(['jobs', 'new', key])

 showSelect(prop) {
   this[prop + 'Select'].show();
 }

 setVal = (prop, val, valId) => this.setState( prevState => {
     prevState.data[prop] = val
     prevState.data[prop + 'Id'] = valId

     return prevState
   })

 onSearch = () => {
     var {navigation} = this.props
     navigation.goBack();
     navigation.state.params.callback( this.state.data );
   }

  render() {
    var { props, t} = this
    const {navigation, equipmentOptions, experienceOptions} = props;
    var {mounted} = this.state
    var state = this.state.data

    return (
      <Container>
        <Header navigation={navigation} back title={I18n.t('jobs.search.title')}/>
      {
        mounted ? (
           <View style={{backgroundColor: '#e6ffe6'}}>
              <OptionsListItem strong
                 key={1}
                 label={'Order By'}
                 value={state.orderby}
                 leftText={'Match'}
                 rightText={'Posting Date'}
                 handler={ (val) => this.setVal('orderby', val)}
                 />
             </View>
        ) : (<Spinner/>)
      }

      {
        mounted && (
          <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>

           <View >
               <InputListItem
                 icon='user-o'
                 label={I18n.t('jobs.search.name')}
                 value={state.author} onChangeText={(text) => this.setVal('author', text)}/>

               <OptionsListItem
                 label={t('category') }
                 leftText={t('ownerOperator') }
                 rightText={t('companyDriver')}
                 value={state.categoryId}
                 handler={(val) => this.setVal('categoryId', val)}
               />

               <OptionsListItem
                 label={t('distance')}
                 leftText={t('regional')}
                 rightText={t('onTheRoad')}
                 value={state.distanceId}
                 handler={(val) => this.setVal('distanceId', val)}
               />


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
               onPress={(id) => this.setVal('equipment', equipmentOptions[id] , id)}
             />
             <Select
                ref={o => this.experienceSelect = o}
                options={ experienceOptions}
                onPress={(id) => this.setVal('experience', experienceOptions[id] , id)}
              />
         </Content>
        )
      }
      </Container>
    );
  }
}

const mapStateToProps = ({globalReducer}) => {
      debugger;

  return  ({
    equipmentOptions: { ...{0: I18n.t('general.any')}, ...(globalReducer.config.equipmentOptionsObj || {})},
    experienceOptions: (globalReducer.config.experienceOptionsObj || {})
  })
};

export default connect(mapStateToProps)(SearchJobs);
