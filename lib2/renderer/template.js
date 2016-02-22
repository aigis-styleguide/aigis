function template(modules, options) {
  this.options = options;
  this.modules = modules;

  var Renderer = require('../plugin/src/renderer/ejs');
  var renderer = new Renderer(options, modules);
  return renderer.render();
}

module.exports = template;
