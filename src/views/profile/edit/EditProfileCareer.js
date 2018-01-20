import React, { Component } from "react";
import { StyleSheet,Image,View , Text, TouchableHighlight, FlatList} from 'react-native';
import { Container, Content, Button } from "native-base";
import Icon from 'react-native-fa-icons';
import {StackView, T11, T12, T13, T14, Column, TransparentButton, ListItem, Select, nav} from 'src/components/'
import { connect } from "react-redux";
import * as profileActions from "src/views/profile/profile.actions";
import I18n from 'react-native-i18n'

class EditProfileCareer extends Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <StackView
        navigation={navigation}
        title={I18n.t('profile.career.title')}
        buttonText={I18n.t('profile.career.addExp')}
        onAccept={() => nav(navigation, 'EditProfileAddExperience')}
      >

        <T14 style={{margin:20}}>Companias para las que has trabajado en los ultimos 5 anos</T14>

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
    careerHistory: Object.values(profileReducer.profileCareer.careerHistory),
    lang: globalReducer.config.lang
  })

export default connect(mapStateToProps, profileActions)(EditProfileCareer);
