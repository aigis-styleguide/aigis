var _ = require('lodash');
var customSyntaxReplacer = [
  require('./src/component_link')
];

function replace(components, options) {
  return _.map(components, function(component) {
    component.md = _.reduce(customSyntaxReplacer, function(md, replacer) {
      return replacer(md, options);
    }, component.md);
    return component;
  });
}

module.exports = replace;
