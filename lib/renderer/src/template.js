function template(modules, options) {
  var engine = options.template_engine;
  var TemplateRenderer = require('./' + engine);
  var renderer = new TemplateRenderer(modules, options);
  return renderer;
}

module.exports = template;
