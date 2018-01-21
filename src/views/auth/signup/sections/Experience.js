import React, { Component } from "react";
import { View } from 'react-native';
import { ListItem, Select, YesNoListItem} from 'src/components/'
import { connect } from "react-redux";

const items = [
  {prop: 'experience',  icon: 'tachometer',   title: 'Experience'},
  {prop: 'jobStatus',  icon: 'hourglass-end', title:'Job Status'},
  {prop: 'equipment',  icon: 'truck',   title: 'Equipment'}
]

const yesNoItems = [
  {prop: 'ownerOperator',  icon: 'street-view', title:'Owner Operator'},
  {prop: 'overRoadExp',  icon:'road', title:'Recent Over the Road Experience?'},
  {prop: 'willTakeOverRoad',  icon: 'hand-stop-o', title:'Will you take an Over the Road Job?'}
]

class Experience extends Component {

  constructor(props) {
      super(props)

      this.state = { }
 }

 setVal = (prop, val, valId) => {
 this.setState((prevState) => {
        prevState[prop] = val

        if(valId){ prevState[prop + 'Id'] = valId }

        return prevState
     })

     this.props.setVal(prop, val, valId)
 }

 componentDidMount(){
     this.setState( this.props.data || {});
 }

 showSelect(prop) {
   this[prop + 'Select'].show();
 }


  render() {
    const {navigation, equipmentOptions, experienceOptions, jobStatusOptions, invalidFields} = this.props
    var data = this.state;

    return (
          <View >
          {
           items.map( ({icon, title, prop}, i) => (
           <ListItem
              key={i}
              navigation={navigation}
              icon={icon}
              label={title}
              value={ data[prop] }
              red={!data[prop] && invalidFields.indexOf(prop) >= 0}
              handler={ () => this.showSelect( prop ) }
              />) )
         }

         {
          yesNoItems.map( ({icon, title, prop}, i) => (
            <YesNoListItem
               key={i}
               icon={icon}
               label={title}
               value={ data[prop] }
               invalid={!data[prop] && invalidFields.indexOf(prop) >= 0}
               handler={ (val) => this.setVal( prop, val ) }
               />) )
          }
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
              options={jobStatusOptions}
              onPress={(i) => this.setVal('jobStatus', jobStatusOptions[i].name, jobStatusOptions[i].id)}
            />
         </View>

    );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : 'More than ' + exp.name})),
  equipmentOptions: globalReducer.config.equipmentOptions,
  jobStatusOptions: globalReducer.config.jobStatusOptions,
  lang: globalReducer.config.lang
})

export default connect(mapStateToProps )( Experience);
