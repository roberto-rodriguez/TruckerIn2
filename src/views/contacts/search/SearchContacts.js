import React, { Component } from "react";
import { connect } from "react-redux";

import SearchForm from './SearchForm'
import SearchResults from './SearchResults'

export default class SearchContacts extends Component {

  constructor(props) {
      super(props)

      this.state = {
        onSearchForm: true,
        searchParams: null
      }
 }

goToSearch = () => this.setState({ onSearchForm: true })

onSearch = (searchParams) => this.setState({  onSearchForm: false, searchParams })

  render() {
    const {navigation} = this.props;
    var {onSearchForm, searchParams} = this.state

    if(onSearchForm){
      return ( <SearchForm navigation={navigation} searchParams={searchParams} onSearch={this.onSearch}/> );
    }else{
      return ( <SearchResults navigation={navigation} goToSearch={this.goToSearch} searchParams={this.state.searchParams}/> );
    }
  }
}
