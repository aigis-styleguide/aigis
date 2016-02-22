var plugin = require('../plugin');

function template(modules, options) {
  var engine = options.template_engine;
  var Renderer = plugin.get('engine', engine);
  var renderer = new Renderer(modules, options);
  return renderer;
}

module.exports = template;
