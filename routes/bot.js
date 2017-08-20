var express = require('express');
var router = express.Router();
var twit = require('twit');
var config = require('./../config.js');
var json2csv = require('json2csv');
var fs = require('fs');

var Twitter = new twit(config);

router.get('/', function(req, res, next) {
  
  var now = new Date();
  var yesterday = now.setDate(now.getDate()-1);;;
  var fields = ["created_at", "user.name", "text"];
  var params = {
    q: 'airbnb since:' + yesterday, 
    count: 100,
  } 

  Twitter.get('search/tweets', params, function(err, data) {

    if (!err && data && data.statuses) {
    
      var csv = json2csv({ data: data.statuses, fields: fields });
        
      fs.writeFile('file.csv', csv, function(err) {
        if (err) throw err;
        console.log('Something went wrong writing file');
      
      });
      res.send(200);
      }
    else {
      console.log('Something went wrong while searching');
    }
  });
  
});


module.exports = router;
