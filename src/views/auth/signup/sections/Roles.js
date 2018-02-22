import React, { Component } from "react";
import { View } from 'react-native';
import { ListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'
import * as roles from 'src/components/c/Role'

const items = [
  { icon: 'truck',   title: 'driver', prop: roles.DRIVER, desc: 'canApply' },
  { icon: 'bank',   title: 'company', prop: roles.COMPANY, desc: 'canPost' }
]

class Roles extends Component {

  t = (key) => I18n.t(['signup', 'roles', key])

  render() {
    const {selectRole} = this.props
    var t = this.t;

    return (
          <View >
          {
           items.map( ({icon, title, prop, roleKey, desc}, i) => (
             <ListItem
                key={i}
                icon={icon}
                label={ t( desc ) }
                value={ t( title ) }
                handler={() => selectRole(prop, t( title ))}
                />) )
           }
         </View>
    );
  }
}

export default connect(mapStateToProps)(Roles);
