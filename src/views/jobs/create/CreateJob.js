import React, { Component } from "react";
import { StyleSheet,Image,View , Text } from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {Row, Header, BlockButton, T12, T13, T14, T16, Column,ListItem, Select} from 'src/components/'

import { connect } from "react-redux";
import * as jobActions from "../reducer/jobActions";


const items = [
  { icon: 'truck',   title: 'Equipment', prop: 'equipment', isSelect: true },
  { icon: 'tachometer',   title: 'Required Experience', prop: 'experience', isSelect: true },
  { icon: 'dollar',   title: 'Compensation', prop: 'compensation' },
  { icon: 'vcard-o',   title: 'Description', prop: 'description' },
  { icon: 'book',   title: 'Requirements', prop: 'requirements' },
  { icon: 'server',   title: 'Responsabilities', prop: 'responsabilities' },
  { icon: 'pie-chart',   title: 'Benefits', prop: 'benefits' }
]

const title = 'Which one do you like?'

class CreateJob extends Component {

  constructor(props) {
      super(props)

      this.state = {
        action:'create',
        title:'',
        data:{
          locationId:null,
          location: 'Anywhere',
          equipmentId: null,
          equipment: 'Any',
          experienceId: null,
          experience: 'Any',
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
    var {action, jobId} = params

    var title;
    switch(action){
        case 'copy': title = 'Copy Job'
                    break;
        case 'edit': title = 'Editar Job'
                    break;
        default: action = 'create';
                title = 'Create Job'
    }

    this.setState((prevState) => {
      prevState['action'] = action;
      prevState['title'] = title;
      return prevState;
    })

  if(jobId){
    setTimeout(() =>  _this.props.loadJob(jobId, (job) => _this.setState((prevState) =>
       {
          if(action === 'copy'){
             job.id = null
          }

         prevState.data = job

         return prevState
       }
    )), 200)
  } 
  }
 }


showSelect(prop) {
  this[prop + 'Select'].show();
}


setVal(prop, val, valId) {
  if(!val)return;

  this.setState((prevState) => {
    prevState.data[prop] = val

    if(valId){
      prevState.data[prop + 'Id'] = valId
    }

    return prevState
  })
}

onAccept = () => this.props.createJob(this.state.data, this.onAcceptCallback, this.state.action)


onAcceptCallback = (jobId) => {
  debugger;
  var navigation = this.props.navigation
  var callback = (navigation.state && navigation.state.params && navigation.state.params.callback)

  callback && callback(jobId)
  navigation.goBack();
}


  render() {
    const {navigation, equipmentOptions, experienceOptions} = this.props;
    var _this = this,
    state = this.state.data;


    return (
      <Container>
        <Header navigation={navigation} back title={this.state.title}/>
        <Content fullscreen contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <ListItem navigation={navigation} key={101} icon={'map-marker'} label={'Where'} value={ state.location} routeName={'LocationPicker'} params={{setVal: (prop, val, valId) => this.setVal(prop, val, valId)}}/>
            {
              items.map(({icon, title, prop, isSelect}, i) =>
               (<ListItem
                  key={i}
                  navigation={navigation}
                  icon={icon}
                  label={title}
                  value={ state[prop]}
                  params={!isSelect && {title, text: state[prop], callback: (text)=> _this.setVal(prop, text)}}
                  handler={isSelect && (() => this.showSelect( prop ))}
                  />))
            }
         </View>

         <BlockButton onPress={() => this.onAccept()}/>

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
      equipmentOptions: [{id:0, name:'Any'}, ...globalReducer.config.equipmentOptions] ,
      experienceOptions:[{id:0, name:'Any'}, ...globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : 'More than ' + exp.name})) ]
    });

    export default connect(mapStateToProps, jobActions)(CreateJob);
