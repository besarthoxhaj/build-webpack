'use strict';

var Stack = require('./stack.js');
var utils = require('./utils.js');

/**
 * Graph implementation
 * nodes: [{
 *  id: Number,
 *  content: String,
 *  path: String,
 * }]
 *
 * edges: [{
 *  [key:Number]: [Number]
 * }]
 */
class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }
  insertNode(data) {
    if(utils.pluck('id')(this.nodes).indexOf(data) !== -1) {
      console.log('CAN NOT INSERT TWO IDENTICAL NODES');
      return;
    }
    this.nodes.push(data);
    this.edges[data.id] = [];
    return this;
  }
  insertEdge(A,B) {

    if(utils.pluck('id')(this.nodes).indexOf(A) === -1 || utils.pluck('id')(this.nodes).indexOf(B) === -1) {
      console.log('ONE OR MORE NODES WAS NOT FOUND!');
      return;
    }

    this.edges[A].push(B);

    // make sure they are in
    // alphabetical order
    this.edges[A].sort();
    this.edges[B].sort();

    return this;
  }
  removeNode(node) {

    if(this.nodes.indexOf(node) === -1) {
      console.log('NODE WAS NOT FOUND!');
      return;
    }

    var edgesOfDeleteNode = this.edges[node];
    for(var ii = 0; ii < edgesOfDeleteNode.length; ii++) {
      this.edges[edgesOfDeleteNode[ii]].splice(this.edges[edgesOfDeleteNode[ii]].indexOf(node),1);
    }

    delete this.edges[node];
    this.nodes.splice(this.nodes.indexOf(node),1);
    return this;
  }
  removeEdge(A,B) {
    // make sure the edge exists
    // check if A got a reference to B
    // and check if B got the same to A
    if(this.edges[A].indexOf(B) === -1 || this.edges[B].indexOf(A) === -1) {
      console.log('SOMETHING WRONG!');
      return;
    }

    // delete reference from A
    this.edges[A].splice(this.edges[A].indexOf(B),1);
    this.edges[B].splice(this.edges[B].indexOf(A),1);

    return this;
  }
  print() {
    return JSON.parse(JSON.stringify(this));
  }
}

/**
 * Depth-First Search requires a stack
 * since uses a LIFO algorithm.
 * @param  {Object} graph data structure
 * @return {[type]}       [description]
 */
var traverse = function(graphRoot) {
  var stack = new Stack();
  var visited = [];
  stack.push(graphRoot.nodes[0]);
  visited.push(graphRoot.nodes[0]);

  // look at the top of the stack
  // get the first unvisited element
  // and visit in alphabetical order
  // its neighborhoods
  while(!stack.isEmpty()) {
    var topStack = stack.getTop();
    var edges = graphRoot.edges[topStack];
    var unvisited = [];
    for(var ii = 0; ii < edges.length; ii++) {

      if(visited.indexOf(edges[ii]) === -1) {
        unvisited.push(edges[ii]);
      }
    }
    if(unvisited.length === 0) {
      stack.pop();
    } else {
      stack.push(unvisited[0]);
      visited.push(unvisited[0]);
    }
  }

  return visited;
};

if (typeof module === 'object' && module.exports) {
  module.exports = {
    Graph,
    traverse,
  };
}