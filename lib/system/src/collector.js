var _ = require('lodash');

function collector(modules, type) {
  var collection = _(modules)
    .map(function(module) {
      return module.config[type];
    })
    .flatten()
    .union()
    .sortBy()
    .value();

  return collection;
}

module.exports = collector;
