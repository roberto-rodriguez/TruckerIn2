import React, { Component } from "react";
import {  View } from "react-native";

import {OptionsListItem,  InputListItem, ListItem,  TextEntry, Select} from 'src/components/'
import styles from "../styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";

import PhoneField from '../fields/PhoneField'

const items = [
  {prop: 'experience',  icon: 'tachometer',   title: 'experience'}
]

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = props.data
  }


  setVal = (prop, val, valId) => {
    this.setState((prevState) => {
           prevState[prop] = val
           if(valId){ prevState[prop + 'Id'] = valId }

           return prevState
        })

        this.props.setVal(prop, val, valId)
  }


  showSelect = (prop) => this[prop + 'Select'].show();

  render() {
    var data = this.state
    var setVal = this.setVal
    const {navigation, experienceOptions, invalidFields} = this.props

    return (
      <View>

      <TextEntry
        limit={140}
        label={'Headline:'}
        defaultValue={data.title}
        invalid={invalidFields.indexOf('title') >= 0}
        onChangeText={(val) => setVal('title', val)}
      />

        <OptionsListItem borderTop
          label={'Category: '}
          leftText={'Owner Operator'}
          rightText={'Company Driver'}
          value={data.categoryId}
          invalid={invalidFields.indexOf('categoryId') >= 0}
          handler={(val) => setVal('categoryId', val)}
        />

        <OptionsListItem
          label={'Distance: '}
          leftText={'Regional'}
          rightText={'On the Road'}
          value={data.distanceId}
          invalid={invalidFields.indexOf('distanceId') >= 0}
          handler={(val) => setVal('distanceId', val)}
        />

      <PhoneField
        label ={'Best Phone Number to Call'}
        keyboardType= {'phone-pad'}
        icon={'phone'}
        value={data.phone}
        onChangeText={(text) => setVal('phone', text)}
      />

        {
         items.map( ({icon, title, prop}, i) => (
         <ListItem
            key={i}
            navigation={navigation}
            icon={icon}
            label={'Minimum Experience Required'}
            value={data.experience}
            red={invalidFields.indexOf('experienceId') >= 0 && !data.experience}
            handler={ () => this.showSelect( 'experience' ) }
            />) )
       }

       <Select
          ref={o => this.experienceSelect = o}
          options={ experienceOptions}
          onPress={(i) => setVal('experience', experienceOptions[i].name, experienceOptions[i].id)}
        />

      </View>
    );
  }

}



const mapStateToProps = ({globalReducer}) => ({
  experienceOptions:  globalReducer.config.experienceOptions
})

export default connect( mapStateToProps )(Information);
