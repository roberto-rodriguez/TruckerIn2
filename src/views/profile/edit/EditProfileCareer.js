import React, { Component } from "react";
import {  View, FlatList} from 'react-native';
import Icon from 'react-native-fa-icons';
import {StackView, T14, Column, ListItem,  nav} from 'src/components/'
import { connect } from "react-redux"; 
import I18n from 'react-native-i18n'

class EditProfileCareer extends Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView
        navigation={navigation}
        title={I18n.t('profile.titles.updateCareer')}
        buttonText={I18n.t('profile.career.addExp')}
        onAccept={() => nav(navigation, 'EditProfileAddExperience')}
      >

        <T14 style={{margin:20}}>{I18n.t('profile.career.updateCareerMsg')}</T14>

        <View style={{ flex: 1}}>
            <FlatList
              data={ this.props.careerHistory}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
              <ListItem
                 navigation={navigation}
                 icon={'caret-right'}
                 label={item.date }
                 value={item.company  }
                 routeName= {"EditProfileAddExperience"}
                 params= {{item}}
                 /> ) }
                 />
         </View>


        </StackView>
    );
  }
}

const mapStateToProps = ({profileReducer}) => ({
    careerHistory: Object.values(profileReducer.profileCareer.careerHistory)
  })

export default connect(mapStateToProps)(EditProfileCareer);
