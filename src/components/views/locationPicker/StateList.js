import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, Spinner } from "src/components/";
import  * as locationsActions from './locations.actions'
import theme from 'src/theme/variables/platform';
import StateItem from './StateItem'
import { connect } from "react-redux";

class StateList extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: true,

        searchStateText: null,
        stateName: null,
        stateId: null,

        list:null,
        reset: null
     }
 }

 componentDidMount(){
  setTimeout(this.filterStates, 150)
 }

 filterStates  = (text) => {
    if(text){
      text = text.toLowerCase()
      var newList = this.props.usStates.filter((o) => o.name.toLowerCase().indexOf( text ) >= 0)
      this.setState({
        searchStateText: text,
        list: newList
      })

    }else{
      this.setState({
        list: this.props.usStates,
        loading: false,
        searchStateText: ''
       })
    }
  }

 itemBuilder = (data, navigation, i , shouldUpdate) => (
   <StateItem
     key={i}
     navigation={navigation}
     label={ data.name }
     value={ data.id }
     handler={this.props.onSelectState}
     shouldUpdate={shouldUpdate}
   />
 )

  loadItems = (page, callback) => callback( (this.state.list || []).slice(page * 20, (page + 1) * 20))

  render() {
    const {navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
           {this.state.loading ? (<Spinner/>) :
            (<Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
              reset={this.state.reset} >
            </Feed>)
          }
        </View>
      </Container>

    );
  }
}

const mapStateToProps = ({globalReducer}, ownProps) => ({
  usStates: globalReducer.config.usStates
})

  export default connect(mapStateToProps)(StateList);
