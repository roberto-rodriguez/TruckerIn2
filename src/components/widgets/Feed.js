import React, {Component} from 'react';
import {Button, Text} from 'native-base'
import {  StyleSheet, ScrollView,  View, Dimensions } from 'react-native';
import {Spinner} from 'src/components/'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

var debbugFeed = false;

export default class Feed extends Component {

  constructor(props){
    super(props)
    debbugFeed && console.log('Feed: constructor');
    this.state = {
      starting: true,
      feed:[],
      loading:false,
      firstLoad: true,
      page:0,
      showLoadIndicator: true
    }

  }


  shouldComponentUpdate(nextProps, nextState){

    if(nextProps.reset){
      this.moreFeed(true);
    }
    debbugFeed && console.log('Feed:: shouldComponentUpdate:: firstLoad' + this.state.firstLoad + ', loading:: ' + this.state.loading + ', reset: ' + nextProps.reset + ' (' + (nextProps.reset ||  this.state.firstLoad || this.state.loading) + ')');
    return this.state.firstLoad || this.state.loading;
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
    })


  }

  render() {
    debbugFeed && console.log('Feed:  ---render---  this.state.page = ' + this.state.page);
    var navigation = this.props.navigation,
    feedBuilder = this.props.feedBuilder;

    var size = this.state.feed.length
    console.log('Feed.render -> size = ' + size);

    if(this.state.starting){
      return (<Spinner/>)
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
        {this.state.feed.map((data, i) => feedBuilder(data, navigation, i, (size - i < 10)))}
        {this.state.showLoadIndicator && (<Button full transparent style={{marginBottom:40}}>
            <Text style={{ color: global.secondaryColor }}>
              Loading...
            </Text>
          </Button>
        )}
      </ScrollView >
    )

  }
}
