import React, { Component } from 'react';
import _ from 'underscore';

const FeedGenerator = {
    generate: function( currentSize, callback ){

      console.log('FeedGenerator:: >>>>> ' + currentSize)
       var postList =  _.range(currentSize, currentSize + 10)
       callback(postList)
    }
}


    export default FeedGenerator;
