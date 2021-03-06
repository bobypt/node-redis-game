'use strict';

const express = require('express');
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
var redis = require('redis');
var cors = require('cors')



const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

var client = redis.createClient(REDIS_PORT, REDIS_HOST); 

// Constants
const PORT = 8080;
const ID = uuidv1();
const CONTEXT_BASE = "/api/v1/gameservice"

// App
const app = express();

//cors
var corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//logging middleware
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});


app.get(CONTEXT_BASE+'/health', (req, res) => {
  res.json({instanceId : ID, version: "1", status: "OK"});
});

app.get(CONTEXT_BASE+'/score/:key', (req, res) => {
  client.get(req.params.key, function (error, result) {
    if (error) {
        console.log(error);
        res.status(400);
        res.send('Invalid request');
    }
    res.json({key: req.params.key, value: result});
  });
});

app.put(CONTEXT_BASE+'/score/:key', (req, res) => {
  client.incr(req.params.key, function (error, result) {
    if (error) {
        console.log(error);
        client.setnx(req.params.key, '1', redis.print);
    }
    res.json({key: req.params.key, value: result});
  });
});


//auth middleware
function isAuthenticated(req, res, next) {
  if (req.body && req.body.token===ID)
      return next();

  res.json({status: "Unauthorised"});
}

app.put(CONTEXT_BASE+'/admin/reset', isAuthenticated, (req, res) => {
  client.flushall(function (error, result) {
    if (error) {
        console.log(error);
    }
    res.json({status: "OK"});
  });
});

//redis
client.on('connect', function() {
  console.log('Redis client connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


app.listen(PORT, () => console.log('App listening on port ' + PORT))