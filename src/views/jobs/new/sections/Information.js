import React, { Component } from "react";
import { View } from "react-native";

import {OptionsListItem,  InputListItem, ListItem,  TextEntry, Select} from 'src/components/'
import styles from "../styles";
import I18n from 'react-native-i18n'
import { connect } from "react-redux";

import PhoneField from '../fields/PhoneField'

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

  onPhoneOptionChange = (phoneOption, phone) => {
    this.setVal('phoneOption', phoneOption)
    this.setVal('phone', phone)
  }

  showSelect = (prop) => this[prop + 'Select'].show();

  t = (key) => I18n.t(['jobs', 'new', key])

  render() {
    var {state, props, setVal, t} = this
    var data = state
    const {navigation, experienceOptions, invalidFields} = props

    return (
      <View>

      <TextEntry
        limit={140}
        label={t('headline')}
        defaultValue={data.title}
        invalid={invalidFields.indexOf('title') >= 0}
        onChangeText={(val) => setVal('title', val)}
      />

      <ListItem borderTop
         navigation={navigation}
         icon={'tachometer'}
         label={ t('experience') }
         value={data.experience}
         red={invalidFields.indexOf('experienceId') >= 0 && !data.experience}
         handler={ () => this.showSelect( 'experience' ) }
         />

        <OptionsListItem
          label={t('category') }
          leftText={t('ownerOperator') }
          rightText={t('companyDriver')}
          value={data.categoryId}
          invalid={invalidFields.indexOf('categoryId') >= 0}
          handler={(val) => setVal('categoryId', val)}
        />

        <OptionsListItem
          label={t('distance')}
          leftText={t('regional')}
          rightText={t('onTheRoad')}
          value={data.distanceId}
          invalid={invalidFields.indexOf('distanceId') >= 0}
          handler={(val) => setVal('distanceId', val)}
        />

      <PhoneField
        data={data}
        onPhoneOptionChange={this.onPhoneOptionChange}
      />


       <Select
          ref={o => this.experienceSelect = o}
          options={ experienceOptions}
          onPress={(id) => setVal('experience', experienceOptions[id], id)}
        />

      </View>
    );
  }

}



const mapStateToProps = ({globalReducer}) => ({
  experienceOptions:  globalReducer.config.experienceOptionsObj
})

export default connect( mapStateToProps )(Information);
