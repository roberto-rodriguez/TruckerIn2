import React, { Component } from "react";
import { View } from 'react-native';
import { ListItem, Select, OptionsListItem, T11, RowColumn} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  {prop: 'experience',  icon: 'tachometer', title: 'experience'},
  {prop: 'equipment',  icon: 'truck', title: 'equipment'}
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

  t = (key) => I18n.t(['jobs', 'new', key])


  render() {
    const {navigation, equipmentOptions, experienceOptions, invalidFields } = this.props
    var data = this.state;
    var t = this.t

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
              red={!data[prop] && invalidFields.indexOf(prop + 'Id') >= 0}
              handler={ () => this.showSelect( prop ) }
              />) )
         }

           <OptionsListItem
             invalid={!data['categoryId'] && invalidFields.indexOf('categoryId') >= 0}
             label={t('category') }
             leftText={t('ownerOperator') }
             rightText={t('companyDriver')}
             value={data.categoryId}
             handler={(val) => this.setVal('categoryId', val)}
           />

           <OptionsListItem
             invalid={!data['distanceId'] && invalidFields.indexOf('distanceId') >= 0}
             label={t('distance')}
             leftText={t('regional')}
             rightText={t('onTheRoad')}
             value={data.distanceId}
             handler={(val) => this.setVal('distanceId', val)}
           />

         <Select
            ref={o => this.equipmentSelect = o}
            options={ equipmentOptions}
            onPress={(id) => this.setVal('equipment', equipmentOptions[id], id)}
          />
          <Select
             ref={o => this.experienceSelect = o}
             options={ experienceOptions}
             onPress={(id) => this.setVal('experience', experienceOptions[id], id)}
           />
         </View>

    );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  experienceOptions: globalReducer.config.experienceOptionsObj || {},
  equipmentOptions: globalReducer.config.equipmentOptionsObj || {},
  lang: globalReducer.config.lang
})

export default connect(mapStateToProps )( Experience);
