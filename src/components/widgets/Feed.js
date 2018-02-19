import React, {Component} from 'react';
import {Button, Text, Spinner} from 'native-base'
import {  StyleSheet, ScrollView,  View, Dimensions } from 'react-native';
import {FullSpinner} from 'src/components/'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n'
var debbugFeed = false;
import { connect } from "react-redux";


 class Feed extends Component {

  constructor(props){
    super(props)
    debbugFeed && console.log('Feed: constructor');
    this.state = {
      starting: true,
      feed:[],
      loading:false,
      firstLoad: true,
      page: (props.initialPage || 0),
      showLoadIndicator: true
    }

  }

  componentWillReceiveProps(newProps){
    if(newProps.headerError){
      this.setState({starting: false, loading: false, showLoadIndicator: false})
    }
  }


  shouldComponentUpdate(nextProps, nextState){

    if(nextProps.reset){
      this.moreFeed(true);
    }
    debbugFeed && console.log('Feed:: shouldComponentUpdate:: firstLoad' + this.state.firstLoad + ', loading:: ' + this.state.loading + ', reset: ' + nextProps.reset + ' (' + (nextProps.reset ||  this.state.firstLoad || this.state.loading) + ')');
    return this.state.firstLoad || this.state.loading || (this.state.page <= 0);
  }


  componentDidMount(props){
    this.HEIGHT = Dimensions.get('window').height;
    debbugFeed && console.log('Feed: componentDidMount HEIGHT = ' +   this.HEIGHT);
    setTimeout(this.moreFeed, 100)
  }


  handleScroll = (event) => {
    var scroll = event.nativeEvent.contentOffset.y

     if(!this.state.loading && this.SIZE + 70 - this.HEIGHT - scroll < this.HEIGHT * 6){
       debbugFeed && console.log('Feed: ---------- TRIGGER SCROLL --------');

       this.moreFeed();
     }

}

handleSize = (width, height) => {
  this.SIZE = height;
  debbugFeed && console.log('Feed:  handleSize:: height = ' + height);
  this.state.loading = false;

}

  moreFeed = (reset) => {
    debbugFeed && console.log('Feed: moreFeed:: this.state.page = ' + this.state.page);
    var _this = this;

    this.state.loading = true;
    var page = reset ? 0 : this.state.page

    this.props.feedLoader(page, (items) => {

      if(page === -1 && items.length === 0){
        _this.moreFeed( true )
      }else{
          _this.setState((prevState) => {
            return ({
            ...prevState,
            starting: false,
            feed: reset ? items : prevState.feed.concat(items),
            firstLoad: false,
            page: reset ? 1 :  prevState.page + 1,
            showLoadIndicator: items.length === 10
          })
        }
        )

        if(page === -1){
          _this.moreFeed()
        }
      }
    })


  }

  render() {
    debbugFeed && console.log('Feed:  ---render---  this.state.page = ' + this.state.page);
    var {navigation, feedBuilder, emptyElement} = this.props
    var {showLoadIndicator, feed, starting} = this.state

    var size = feed.length

    if(starting){
      return (<FullSpinner/>)
    }

    return (
      <ScrollView
        scrollEventThrottle={160}
        contentContainerStyle={{marginBottom: 40}}
        showsVerticalScrollIndicator={false}
        centerContent={true}
        scrollsToTop={false}
        stickyHeaderIndices={[]}
        onScroll={this.handleScroll}
        onContentSizeChange={this.handleSize} >

        {this.props.children}
        {(size === 0 && emptyElement) ? emptyElement : feed.map((data, i) => feedBuilder(data, navigation, i, (size - i < 10)))}

        { showLoadIndicator && ( <Spinner color={'#629aa9'}/> )}
      </ScrollView >
    )

  }
}


const mapStateToProps = ({ globalReducer}) => ({headerError: globalReducer.view.headerError})

  export default connect(mapStateToProps)(Feed);
