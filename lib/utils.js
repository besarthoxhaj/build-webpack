'use strict';

const pluck = (key) => (arrObj) => {
  return arrObj.map(elm => elm[key]);
}

const pipe = function() {
  const args = Array.prototype.slice.call(arguments);
  return (n) => {
    return args.reduce((acc,elm) => {
      return elm(acc);
    },n);
  }
};

module.exports = {
  pluck,
  pipe,
};