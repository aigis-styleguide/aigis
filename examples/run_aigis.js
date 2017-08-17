var Aigis = require('../index');

var config = {
  name: 'Examples Styleguide',
  source: [ './css', './demo.md' ],
  source_type: [ '.css', '.sass', '.scss', '.styl' ],
  dest: './styleguide',
  dependencies: [ './aigis_assets', './css' ],
  index: './index.md',
  template_engine: 'hbs',
  template_dir: './template_hbs',
  log: false,
  color_palette: true,
  // color_palette_sass:  { file_path: './sass/palette.scss', custom_template: true},
  transform: [ 'html' ],
  timestamp_format: 'YYYY/MM/DD HH:mm',
  preview_class: 'aigis-preview',
  component_dir: './html',
  output_collection: [ 'category', 'tag' ],
  highlight: true,
  highlight_theme: 'monokai',
  lang_prefix: 'language-',
  helper_options: { disable_link_index: true }
};

try {
  var aigis = new Aigis(config);
  aigis.run();
}
catch(e) {
  console.error(e.message);
}
