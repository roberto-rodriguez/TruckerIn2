import React, { Component } from "react";
import { View } from 'react-native';
import { AgentMsg, CustomButton, LinkButton, ListItem, LongInputListItem, Select} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

  class About extends Component {

    constructor(props) {
        super(props)
        this.state = { }
   }

   componentDidMount(){
     var data = this.props.data || {}
     this.setState({
       jobStatus: data.jobStatus,
       jobStatusId: data.jobStatusId,
       about: data.about,
       roleId: data.roleId
     });
   }

  t = key => I18n.t(['signup', 'about', key])

  showSelect( ) {
    this['statusSelect'].show();
  }


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
            <AgentMsg text={I18n.t(['signup', 'about', (data.roleId === roles.BROKER ? 'descBroker' : 'descCompany')])}/>

            <ListItem
               key={100}
               navigation={navigation}
               icon={'hourglass-end'}
               label={I18n.t('profile.information.hiringStatus') }
               value={ data[ 'jobStatus' ]}
               handler={ () => this.showSelect( ) }
               />

              <LongInputListItem icon='quote-left'
                label={ I18n.t( 'general.typeHere' ) }
                value={data['about']}
                onChangeText={(text) => this.setVal('about', text)}/>

                <Select
                   ref={o => this.statusSelect = o}
                   options={statusOptions}
                   onPress={(i) => this.setVal( 'jobStatus', statusOptions[i].name, statusOptions[i].id)}
                 />
         </View>
    )
  }
}

const mapStateToProps = ({ globalReducer}) => ({statusOptions:  globalReducer.config.hiringStatusOptions})

export default connect(mapStateToProps)(About);
