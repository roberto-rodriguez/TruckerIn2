import React, { Component } from "react";
import {  View, TouchableHighlight, StyleSheet } from "react-native";
import {SimpleListItem,  RowColumn, Row, Column, T14} from 'src/components/'
import Icon from 'react-native-fa-icons';
import I18n from 'react-native-i18n'
import { connect } from "react-redux";
import theme from 'src/theme/variables/platform'


class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentIds: props.data.equipmentIds &&  props.data.equipmentIds.split(',')
    };
  }


  setVal = (id) => this.setState((prevState) => {

    var existentList = prevState.equipmentIds || [];

    var equipmentIds = existentList.filter(e => e != id)

    if (existentList.length === equipmentIds.length){
      equipmentIds.push( id )
    }

    this.props.setVal('equipmentIds', equipmentIds.join(','))

    return {equipmentIds}
   })



  render() {
    const {navigation,   equipmentOptionsObj, invalidFields} = this.props
    var {equipmentIds} = this.state

    var selected = equipmentIds && equipmentIds.length > 0
    return (
      <View>
          <RowColumn h={50}>
            <T14 green red={invalidFields.indexOf('equipmentIds') >= 0 && !selected}>
              {selected ?
                    equipmentIds.map(id => equipmentOptionsObj[id]).join(' • ') :
                    I18n.t('jobs.new.equipment')}
             </T14>
          </RowColumn>

          {Object.entries(equipmentOptionsObj).map(this.buildItem)}
      </View>
    );
  }


  buildItem = (item, key) =>  {
    var id = item[0]
    var name = item[1]
    var borderStyle = {borderBottomWidth:0.3, borderColor: global.secondaryColor}

    if(key === 0){
      borderStyle['borderTopWidth'] = 0.3
    }

    var style = {}

    if(this.state.equipmentIds && this.state.equipmentIds.indexOf(id + '') >= 0){
      style = {backgroundColor: theme.lightGreen}
    }

    return (
      <TouchableHighlight key={key}  underlayColor={'transparent'}  onPress={() => this.setVal(id + '')}>
       <View style={style}>
         <Row h={60}  style={borderStyle}>
           <Column  h={60}  columns={7}  >
             <Icon name={'truck'} style={styles.icon}/>
           </Column>
           <Column h={60} start columns={7} colspan={5} >
             <T14>{name}</T14>
           </Column>
         </Row>
       </View>
     </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
    icon: {   fontSize: 18 }
  })

const mapStateToProps = ({globalReducer}) => ({
  equipmentOptionsObj:  globalReducer.config.equipmentOptionsObj
})

export default connect( mapStateToProps )(Equipment);
