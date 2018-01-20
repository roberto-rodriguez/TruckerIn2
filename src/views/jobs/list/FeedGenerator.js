import React, { Component } from 'react';
import _ from 'underscore';

const FeedGenerator = {
    generate: function(page, callback ){
 debugger;
       var postList =  _.range(page * 10, page * 10 + 10)
       callback(postList)
    }
}


    export default FeedGenerator;
