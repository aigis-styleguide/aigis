function template(modules, options) {
  var plugin = require('../plugin')(options);
  var engine = options.template_engine;
  var TemplateRenderer = require('../plugin/src/engine/' + engine);
  var renderer = new TemplateRenderer(modules, options);
  return renderer;
}

module.exports = template;
