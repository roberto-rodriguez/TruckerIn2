import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from "native-base";
import { connect } from "react-redux";
import {Text,Row, Column, LinkButton, mapStateToProps} from 'src/components/'
import postStyle  from 'src/theme/sharedStyles/PostStyle'
import * as jobActions from "src/views/jobs/jobs.actions";
import I18n from 'react-native-i18n'

 class Details extends Component {

  render() {

    return (
      <View style={postStyle.bottomline}>
        <Row>
            <Column columns={2}>
              <LinkButton text={'Description'}/>
            </Column>
            <Column columns={2}>
              <LinkButton text={'Salary & Benefits'}/>
            </Column>
        </Row>
      </View>
    )
  }
  }

export default connect(mapStateToProps, jobActions)(Details);
