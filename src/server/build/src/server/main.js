"use strict";
var params = require('../../params');
var server = require('./index');
server(params.server).then(function () { return console.log('not yet ready to play tetris with U ...'); });
