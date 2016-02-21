function template(modules, options) {
  this.options = options;
  this.modules = modules;

  var render = require('../plugin/src/renderer/ejs');
  render(modules, options);
}

module.exports = template;
