function renderer(components, options) {
  var engine = options.template_engine;
  var TemplateRenderer = require('./engine/' + engine);
  return new TemplateRenderer(components, options);
}

module.exports = renderer;
