function template(modules, options) {
  var plugin = require('../plugin')(options);
  var engine = options.template_engine;
  var Renderer = plugin.get('engine', engine);
  var renderer = new Renderer(modules, options);
  return renderer;
}

module.exports = template;
