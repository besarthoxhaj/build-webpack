(function(modules) {

  var installedModules = {};

  function require(id) {

    var module = installedModules[id] = {};

    modules[id](module, require);

    return module.exports;
  }

  require(0);
})([
  (function(module, _require_) {
    'use strict';

    var one = _require_(1);
    console.log('Hello, ' + one);
  }),
  (function(module, _require_) {
    'use strict';

    module.exports = 'World!';
  }),
])
