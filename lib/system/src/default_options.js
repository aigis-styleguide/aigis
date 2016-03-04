var path = require('path');
var options = {
  name: 'Styleguide',
  source: [],
  source_type: ['.css', '.sass', '.scss', '.styl'],
  dest: './styleguide',
  dependencies: [],
  template_dir: './template',
  module_dir: './html',
  format: 'yaml',
  timestamp_format: 'YYYY/MM/DD HH:mm',
  template_engine: 'ejs',
  highlight_theme: 'dracula',
  // dark  [monokai, dracula, seti]
  // light [duotone-light, on-light]
  transform: ['html', 'jade'],
  beautify: false,
  log: false,
  color_palette: true,
  preview_class: 'aigis-preview',
  output_collection: ['category', 'tag'],
};

module.exports = function(basedir) {
  options.dest = path.join(basedir, options.dest);
  options.template_dir = path.join(basedir, options.template_dir);
  options.module_dir = path.join(basedir, options.module_dir);
  return options;
};
