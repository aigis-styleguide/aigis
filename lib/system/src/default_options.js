var path = require('path');
var options = {
  name: 'Styleguide',
  source: [],
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
  transform: ['html', 'jade', 'js', 'coffee'],
  beautify: false,
  log: false,
};

module.exports = function(basedir) {
  options.dest = path.join(basedir, options.dest);
  options.template_dir = path.join(basedir, options.template_dir);
  options.module_dir = path.join(basedir, options.module_dir);
  return options;
};
