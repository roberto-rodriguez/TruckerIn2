import React, { Component } from "react";
import { View , Text } from 'react-native';
import Icon from 'react-native-fa-icons';
import { ListItem, InputListItem, YesNoListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'envelope-o',   title: 'email', prop: 'email'},
  { icon: 'phone',   title: 'phone', prop: 'phone'}
]

const yesNoItems = [
  {prop: 'showPersonalInfo',  icon: 'unlock', title:'showPersonalInfo'}
]

class Contact extends Component {

  constructor(props) {
      super(props)
      this.state = { }
 }

  componentDidMount(){
      this.setState( this.props.data || {});
  }

  setVal = (prop, val, valId) => {
    this.setState((prevState) => {
         prevState[prop] = val

         if(valId){ prevState[prop + 'Id'] = valId }

         return prevState
      })

      this.props.setVal(prop, val, valId)
  }

  render() {
    const {navigation, jobStatusOptions, invalidFields} = this.props
    var data  = this.state;
 
    return (
          <View >
          {
           items.map( ({icon, title, prop}, i) => (
           <InputListItem
              key={i}
              icon={icon}
              label={I18n.t(['profile','information' , title])}
              value={ data[prop] }
              invalid={!data[prop] && invalidFields.indexOf(prop) >= 0}
              onChangeText={ text => this.setVal(prop, text)}
              />) )
         }
         <ListItem
           navigation={navigation}
           key={101}
           icon={'map-marker'}
           label={'Location'}
           value={ data.location}
           red={!data.locationId && invalidFields.indexOf('locationId') >= 0}
           routeName={'LocationPicker'}
           params={{setVal: this.setVal}}/>


           {
            yesNoItems.map( ({icon, title, prop}, i) => (
              <YesNoListItem
                 key={i}
                 icon={icon}
                 label={I18n.t(['profile','information' , title])}
                 value={ data[prop] }
                 invalid={!data[prop] && invalidFields.indexOf(prop) >= 0}
                 handler={ val => this.setVal( prop, val ) }
                 />) )
            }
         </View>

    );
  }
}


export default connect( mapStateToProps )(Contact);
