'use strict';

var test = require('tape');
var Graph = require('../lib/graph.js').Graph;

test('graph -> insert NODE', t => {
  var graph = new Graph();
  graph.insertNode({
    id:0,
    content:'A'
  }).insertNode({
    id:1,
    content:'B'
  }).insertNode({
    id:2,
    content:'C'
  }).insertNode({
    id:3,
    content:'D'
  });

  graph.insertEdge(0,1).insertEdge(2,1).insertEdge(0,2).insertEdge(1,3);
  t.deepEqual(graph.print(),{
    edges: {
      0: [ 1, 2 ],
      1: [ 3 ],
      2: [ 1 ],
      3: []
    },
    nodes: [
      { content: 'A', id: 0 },
      { content: 'B', id: 1 },
      { content: 'C', id: 2 },
      { content: 'D', id: 3 }
    ] 
  },'got right graph');
  t.end();
});