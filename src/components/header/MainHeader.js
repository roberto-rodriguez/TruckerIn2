
import React, {Component} from "react";
import {View, Image, StyleSheet} from "react-native"; 
import {Header} from "src/components/";
import HeaderBtn from 'src/components/header/buttons/HeaderBtn'
import ProfileBtn from 'src/components/header/buttons/ProfileBtn'
import theme from 'src/theme/variables/platform';
import styles from './styles'
import { connect } from "react-redux";

 class MainHeader extends Component {

  render() {
      const {navigation, title, right, notifications } = this.props;

      return (
        <Header navigation={navigation}
          title={title}
          toLeft={<ProfileBtn navigation={navigation}/> }
          toRight={<HeaderBtn icon='bell' disabled={notifications === 0} badge={notifications} handler={() => navigation.navigate('Notifications')}/>}
          right={right}
         />
      );
  }
}

const mapStateToProps = ({globalReducer}) => ({
  showHeaderNotification: globalReducer.view.showHeaderNotification,
  headerNotification: globalReducer.view.headerNotification,
  notifications: globalReducer.profileInfo.notifications
});

  export default connect(mapStateToProps)(MainHeader);
