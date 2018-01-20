import React, {Component} from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Platform,
	Modal
} from 'react-native'
import { connect } from 'react-redux'
import {Separator} from 'src/component'

class ProgressBar extends Component {

  render() {

		var props = this.props;
		return (
		<Modal
			style={styles.progressBar}
			animationType={"fade"}
			transparent={true}
			visible={ props.isLoading}
			onRequestClose={() => {}}
			>
				<Separator/>
			   <ActivityIndicator size="large" color={"#EA0000"} />
	     <Separator/>
		  </Modal>
		)
	}

 }

// const ProgressBar = () => (
// 	<View style={styles.progressBar}>
// 		<ActivityIndicator size="large" color={Platform.OS === "ios" ? "white" : "#EA0000"} />
// 	</View>
// );

const styles = StyleSheet.create({
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor:'transparent'
	}
});

function mapStateToProps(state, ownProps) {
	return {
    isLoading: state.isLoading
  }
}


export default connect(mapStateToProps, null)(ProgressBar);
