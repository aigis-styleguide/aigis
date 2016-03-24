exports.builder = {
  'e': {
    alias: 'engine',
    describe: 'choose template engine [ejs, jade, hbs]',
    default: 'ejs'
  }
};

exports.handler = function init(argv) {
  var beauty = require('beauty');
  beauty.beautifyConsole();
  beauty.setTheme({
    'log': ['blue'],
    'info': ['cyan', 'bold'],
    'warn': ['yellow','italic'],
    'error': ['red','bold','underline']
  });
  var path = require('path');
  var fs = require('fs-extra');
  var cwd = path.resolve();
  var exampleDir = path.join(__dirname, '../../examples');

  var assets = [
    {
      dest: 'aigis_config.yml',
      src: 'default_config.yml'
    },
    {
      src: 'aigis_assets',
      dest: 'aigis_assets'
    },
    {
      src: 'template_' + argv.engine,
      dest: 'template_' + argv.engine
    }
  ];

  console.log('Created the following files and directories:');
  assets.forEach(function(asset) {
    var src = asset.src, dest = asset.dest;
    var _path = path.join(exampleDir, src);
    var _dest = path.join(cwd, dest);

    switch(src) {
      case 'default_config.yml':
        var file = fs.readFileSync(_path, 'utf-8');
        file += 'template_dir: ./template_' + argv.engine + '\n';
        file += 'template_engine: ' + argv.engine + '\n';

        try {
          var config = fs.readFileSync(_dest);
          console.warn('Cowardly refusing to overwrite existing: aigis_config.yml');
        }
        catch (err) {
          console.log(' ', path.relative(cwd, _dest));
          fs.outputFileSync(_dest, file);
        }
        break;
      default:
        console.log(' ', path.relative(cwd, _dest));
        fs.copySync(_path, _dest, {
          filter: function(file) {
            console.log(' ', path.relative(exampleDir, file));
            return true;
          }
        });
    }
  });
};
