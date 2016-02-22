function template(modules, options) {
  var engine = options.template_engine;
  var Renderer = require('../plugin/src/engine/' + engine);
  var renderer = new Renderer(modules, options);
  return renderer.render();
}

module.exports = template;
