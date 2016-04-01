var _ = require('lodash');

function collector(components, type) {
  var collection = _(components)
    .map(function(component) {
      return component.config[type];
    })
    .flatten()
    .union()
    .compact()
    .sortBy()
    .value();

  return collection;
}

module.exports = collector;
