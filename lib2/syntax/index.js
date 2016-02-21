var _ = require('lodash');
var customSyntaxReplacer = [
  require('./src/module_link')
];

function replace(modules, options) {
  return _.map(modules, function(module) {
    module.md = _.reduce(customSyntaxReplacer, function(md, replacer) {
      return replacer(md, options);
    }, module.md);
    return module;
  });
}

module.exports = replace;
