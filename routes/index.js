var express = require('express');
var route = express.Router();
route.get('/tuesday', function(req,res) {
  res.send('Tuesday')
})
route.get('/', function(req,res) {
  res.send('Wednesday')
})
route.get('/', function(req,res) {
  res.send('fs')
})
route.get('/', function(req,res) {
  res.send('home page')
})
route.get('*', function(req,res) {
  res.send('home page')
})
module.exports = route;