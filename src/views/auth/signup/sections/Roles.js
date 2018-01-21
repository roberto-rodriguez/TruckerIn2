import React, { Component } from "react";
import { View } from 'react-native';
import { SimpleListItem, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import I18n from 'react-native-i18n'

const items = [
  { icon: 'truck',   title: 'driver', prop: 1 },
  { icon: 'user-secret',   title: 'broker', prop: 2 },
  { icon: 'bank',   title: 'company', prop: 3 }
]

class Roles extends Component {

  t = (key) => I18n.t(['signup', 'roles', key])

  render() {
    const {selectRole} = this.props
    var t = this.t;

    return (
          <View >
          {
           items.map( ({icon, title, prop, roleKey}, i) => (
             <SimpleListItem
                borderTop={i === 0}
                key={i}
                icon={icon}
                label={ t( title ) }
                onPress={() => selectRole(prop, t( title ))}
                />) )
           }
         </View>
    );
  }
}

export default connect(mapStateToProps)(Roles);
