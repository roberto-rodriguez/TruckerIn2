import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container,  Content } from "native-base";
import { Feed, Spinner } from "src/components/";
import { connect } from "react-redux"
import theme from 'src/theme/variables/platform';
import I18n from 'react-native-i18n'
import StateItem from './StateItem'
import LocationSearch from './LocationSearch'
import  * as locationsActions from './locations.actions'

class StateList extends Component {

  constructor(props) {
      super(props)

      this.state = {
        loading: true,

        searchText: null,
        // stateName: null,
        // stateId: null,

        list:null,
        reset: null
     }
 }

 componentDidMount(){
    setTimeout(this.filterStates, 150)

    var {MULTIPLE_STATES} = this.props

    if(MULTIPLE_STATES){
      if(this.props.location && this.props.location.stateIdList && this.props.location.stateIdList.length > 0){
          this.props.setLocation( this.props.location )
      }else{
        this.props.clearLocation()
      }
      return;
    }
 }

 filterStates  = (text) => {
    if(text){
      text = text.toLowerCase()
      var newList = this.props.usStates.filter((o) => o.name.toLowerCase().indexOf( text ) >= 0)
      this.setState({
        searchText: text,
        list: newList,
        reset: true
      })

    }else{
      this.setState({
        list: this.props.usStates,
        loading: false,
        searchText: '',
        reset: true
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
     MULTIPLE_STATES={this.props.MULTIPLE_STATES}
   />
 )

  loadItems = (page, callback) => {
    callback( (this.state.list || []).slice(page * 20, (page + 1) * 20))
    this.setState({ reset: false })
  }

  render() {
    const {navigation} = this.props

    return (
      <Container white>
        <View style={{minHeight:'100%'}}>
            <LocationSearch title={I18n.t('cmp.loc.searchStates')}  onSearchChangeText={this.filterStates} value={this.state.searchText}/>
           {this.state.loading ? (<Spinner/>) :
            (<Feed feedLoader={this.loadItems}
              feedBuilder={this.itemBuilder}
              navigation={navigation}
              starting={this.state.reset} >

            </Feed>)
          }
        </View>
      </Container>

    );
  }

  // allStatesItem = () => (<StateItem
  //   key={-1}
  //   navigation={this.props.navigation}
  //   label={ I18n.t('cmp.loc.allStates')}
  //   value={'US'}
  //   handler={this.props.onSelectState}
  // />)
}



const mapStateToProps = ({locationReducer}, ownProps) => ({
  usStates: locationReducer.usStates,
  timestamp: locationReducer.timestamp
})

  export default connect(mapStateToProps, locationsActions)(StateList);
