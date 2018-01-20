import React, { Component } from "react";
import { View } from 'react-native';
import { RowColumn, CustomButton, LinkButton, Row, T13, T15, T16, mapStateToProps} from 'src/components/'
import { connect } from "react-redux";
import styles from "../styles";
import I18n from 'react-native-i18n'

class ProfilePic extends Component {

  t = key => I18n.t(['signup', 'pic', key])

  render() {
    var {state, t} = this

    return (
          <View>
              <RowColumn h={70}>
                <T16 green>{t('setPic')}</T16>
              </RowColumn>
              <RowColumn h={70}>
                <CustomButton white style={{height: 50, width:100}} textStyle={{fontSize: 20}} icon={'camera'}/>
              </RowColumn>

              <Row  h={50}/>

              <RowColumn h={40}>
                <LinkButton text={t('latter')} onPress={this.props.doItLatter}/>
              </RowColumn>
         </View>
    )
  }
}

export default connect(mapStateToProps )(ProfilePic);
