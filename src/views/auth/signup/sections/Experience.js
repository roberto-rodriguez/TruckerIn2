import React, { Component } from "react";
import { View } from 'react-native';
import { ListItem, Select, YesNoListItem} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  {prop: 'experience',  icon: 'tachometer', title: 'experience'},
  {prop: 'jobStatus',  icon: 'hourglass-end', title:'jobStatus'},
  {prop: 'equipment',  icon: 'truck',title: 'equipment'}
]

const yesNoItems = [
  {prop: 'ownerOperator',  icon: 'street-view', title:'ownerOperator'},
  {prop: 'overRoadExp',  icon:'road', title:'recentOver'},
  {prop: 'willTakeOverRoad',  icon: 'hand-stop-o', title:'wouldOver'}
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
              label={I18n.t(['profile','experience' , title])}
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
               label={I18n.t(['profile','experience' , title])}
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
  experienceOptions: globalReducer.config.experienceOptions.map((exp) => ({...exp, name: exp.id === 1 ? exp.name : I18n.t('general.moreThan') + exp.name})),
  equipmentOptions: globalReducer.config.equipmentOptions,
  jobStatusOptions: globalReducer.config.jobStatusOptions,
  lang: globalReducer.config.lang
})

export default connect(mapStateToProps )( Experience);
