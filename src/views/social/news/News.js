import React, {Component} from 'react';
import {  StyleSheet, ScrollView,  View, Dimensions, Text } from 'react-native';

import WhatsOnMindView from './widget/WhatsOnMindView';
import FeedGenerator from './FeedGenerator';

import Feed from 'src/components/widgets/Feed'
import Post from './post/Post';
import postData from './data';

export default class News extends Component {

  loadPosts(page, callback){
    var HOST = 'http://69.42.101.181:8095'
console.log('News.loadPost -> currentSize = ' + currentSize);
    var itemsToLoad = page === 0 ? 4 : 10;

    callback([{
	"storyid": 1,
	"type": 1,
	"creationdate": 1509477884612,
  "author": "Roberto Rodriguez",
	"authorid": 5,
  "author2": "Roberto Rodriguez",
	"authorid2": 6,
  "others": 2,
  "title": "I really dont know which title should I put here, but Im sure this is a pretty long title",
	"content": "Startup bootstrap expert who builds the company from the ground up and takes it to the next level. With strong knowledge from the core of Computer Science to the most advanced technologies in the field, I stand out as the head of the company with focus on Organisational and Operational processes of GeekyAnts.\nThe Most Amazing thing I've created is multiuser SMS Portal, which sends nearly 2 millions SMS per day",
	"image": "https://thehcrscoop.files.wordpress.com/2012/02/professional-truck-driver.jpg",
  "authorimage": "https://thehcrscoop.files.wordpress.com/2012/02/professional-truck-driver.jpg",
	"acttype": 3,
	"actauthor": "User7",
	"actauthorid": 7,
	"actauthor2": "User6",
	"actauthorid2": 6,
	"groupid": 1,
	"group": "Group A",
	"likes": 72,
	"comments": 71,
	"shares": 70,
  "storyType": 1,
//   group: 'TruckerIn Comunity'
}]);

    // fetch(HOST + '/tin/social/feed/4/' + itemsToLoad, {
    //   method:'GET',
    // })
    // .then((response) => (response.json()))
    // .then((response) => {
    //   response && callback(response)
    //  })
  //    .catch((err) => {
  //        alert(err)
  //  });
  }

  feedBuilder(data, navigation, i, shouldUpdate){
  //  var data = postData[i%4]
  //  data.thumbnail = require("https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg")
    return <Post  key={i + 1000} data={data} index={i} shouldUpdate={shouldUpdate}  navigation={navigation}/>
  }



  render() {
    console.log('News:  ---render---');
    var navigation = this.props.navigation

    return (
      <Feed feedLoader={this.loadPosts} feedBuilder={this.feedBuilder} navigation={navigation}>

        <WhatsOnMindView navigation={navigation}/>


      </Feed >
    )

  }

}
