import React, { Component } from "react";
import { StyleSheet,Image,View , Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, BlockButton, T12, T13, T14, T16, Column,ListItem, Select} from 'src/components/'
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import * as jobActions from "src/views/jobs/jobs.actions";


const items = [
  { icon: 'truck',   title: 'equipment', prop: 'equipment', isSelect: true },
  { icon: 'tachometer',   title: 'exp', prop: 'experience', isSelect: true },
  { icon: 'dollar',   title: 'compensation', prop: 'compensation' },
  { icon: 'vcard-o',   title: 'desc', prop: 'description' },
  { icon: 'book',   title: 'req', prop: 'requirements' },
  { icon: 'server',   title: 'resp', prop: 'responsabilities' },
  { icon: 'pie-chart',   title: 'benefits', prop: 'benefits' }
]

const title = 'Which one do you like?'

class CreateJob extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: false,
        action:'create',
        title:'',
        data:{
          location: null,
          equipmentId: null,
          equipment: I18n.t('general.any'),
          experienceId: null,
          experience: I18n.t('general.any'),
          compensation: '',
          description: '',
          requirements: '',
          responsabilities: '',
          benefits: ''
         }
      }
 }

 componentDidMount(){
   var _this = this
   var props = this.props
   var params = (props.navigation
                  && props.navigation.state
                  && props.navigation.state.params)

  if(params){
    var {action, jobId, data} = params

    var title;
    switch(action){
        case 'copy': title = I18n.t('jobs.copy')
                    break;
        case 'edit': title = I18n.t('jobs.edit')
                    break;
        default: action = 'create';
                title = I18n.t('jobs.create')
    }

    this.setState((prevState) => {
      prevState['action'] = action;
      prevState['title'] = title;
      prevState['data'] = data;
      return prevState;
    })

  if(jobId){
    setTimeout(() =>  _this.props.loadJobDetails(jobId, (job) => _this.setState((prevState) =>
       {
          if(action === 'copy'){
             job.id = null
          }

         prevState.data = job

         return prevState
       }
    )), 300)
  }
  }
 }

 componentWillReceiveProps(newProps){
   if(newProps.headerError){
     this.setState({ loading: false })
   }
 }



showSelect(prop) {
  this[prop + 'Select'].show();
}


setVal = (prop, val, valId) => {
  if(!val)return;

  this.setState((prevState) => {
    prevState.data[prop] = val

    if(valId){
      prevState.data[prop + 'Id'] = valId
    }

    return prevState
  })
}

onAccept = () => {
  this.setState({loading: true})

   this.props.createJob(this.state.data, this.onAcceptCallback, this.state.action)
}


onAcceptCallback = (jobId) => {
this.setState({loading: false})

  var navigation = this.props.navigation
  var callback = (navigation.state && navigation.state.params && navigation.state.params.callback)

  var job = this.state.data
  job.id = jobId
   
  callback && callback( job )
  navigation.goBack();
}


  render() {
    const {navigation, equipmentOptions, experienceOptions} = this.props;
    var _this = this,
    state = this.state.data || {};

    return (
      <Container>
        <Header navigation={navigation} back title={this.state.title}/>
        <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <ListItem
              navigation={navigation}
              key={101}
              icon={'map-marker'}
              label={I18n.t('general.where')}
              value={ (state.location && state.location.locationName) }
              routeName={'LocationPicker'}
              params={{setVal: this.setVal, data: state.location}}/>

          {
              items.map(({icon, title, prop, isSelect}, i) =>
               (<ListItem
                  key={i}
                  navigation={navigation}
                  icon={icon}
                  label={I18n.t(['jobs','post', title])}
                  value={ state[prop]}
                  params={!isSelect && {
                    title: I18n.t(['jobs', 'post', title]),
                    text: state[prop],
                    callback: (text)=> _this.setVal(prop, text)
                  }}
                  handler={isSelect && (() => this.showSelect( prop ))}
                  />))
            }
         </View>

         <BlockButton loading={this.state.loading} onPress={() => this.onAccept()}/>
            <Select
              ref={o => this.equipmentSelect = o}
              options={equipmentOptions}
              onPress={(i) => this.setVal('equipment', equipmentOptions[i].name, equipmentOptions[i].id)}
            />
            <Select
               ref={o => this.experienceSelect = o}
               options={experienceOptions}
               onPress={(i) => this.setVal('experience', experienceOptions[i].name, experienceOptions[i].id)}
             />
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    icon: { fontSize: 20 }
    })

    const mapStateToProps = ({globalReducer}) => ({
      headerError: globalReducer.view.headerError,
      headerTimestamp: globalReducer.view.headerTimestamp,
      equipmentOptions: [{id:0, name: I18n.t('general.any')}, ...globalReducer.config.equipmentOptions] ,
      experienceOptions:[{id:0, name: I18n.t('general.any')}, ...globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : I18n.t('general.moreThan')  + exp.name})) ]
    });

    export default connect(mapStateToProps, jobActions)(CreateJob);
