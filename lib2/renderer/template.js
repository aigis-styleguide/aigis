function template(modules, options) {
  var engine = options.template_engine;
  var Renderer = require('../plugin/src/renderer/' + engine);
  var renderer = new Renderer(options, modules);
  return renderer.render();
}

module.exports = template;
