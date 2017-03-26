'use strict';

var test = require('tape');
var utils = require('../lib/utils.js');

test('utils:pluck', t => {
  var a = [{id:0},{id:1}];
  var b = utils.pluck('id')(a);
  t.deepEqual(b,[0,1],'ok');
  t.end();
});