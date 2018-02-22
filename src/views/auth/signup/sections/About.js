import React, { Component } from "react";
import { View } from 'react-native';
import { AgentMsg, CustomButton, LinkButton, ListItem, LongInputListItem, Select} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

export default   class About extends Component {

    constructor(props) {
        super(props)
        this.state = { }
   }

   componentDidMount(){
     var data = this.props.data || {}
     this.setState({
       about: data.about,
       roleId: data.roleId
     });
   }

  t = key => I18n.t(['signup', 'about', key])


   setVal(prop, val, valId) {
     this.setState((prevState) => {
        prevState[prop] = val

        if(valId){
          prevState[prop + 'Id'] = valId
        }

        return prevState
     })

     this.props.setVal(prop, val, valId)
   }


  render() {
    var {t} = this
    var { navigation, statusOptions} = this.props
    var data = this.state

    return (
          <View>
            <AgentMsg text={I18n.t(['signup', 'about','descCompany'])}/>


              <LongInputListItem icon='quote-left'
                label={ I18n.t( 'general.typeHere' ) }
                value={data['about']}
                onChangeText={(text) => this.setVal('about', text)}/>

         </View>
    )
  }
}
