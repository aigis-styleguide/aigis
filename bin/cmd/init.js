exports.builder = {
  'e': {
    alias: 'engine',
    describe: 'choose template engine [ejs, jade, hbs]',
    default: 'ejs'
  }
};

exports.handler = function init(argv) {
  var path = require('path');
  var fs = require('fs-extra');
  var cwd = path.resolve();
  var exampleDir = path.join(__dirname, '../../examples');
  var colors = require('colors/safe');

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

  console.log(colors.blue('Created the following files and directories:'));
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
          console.warn(colors.yellow('Cowardly refusing to overwrite existing: aigis_config.yml'));
        }
        catch (err) {
          console.log(colors.blue(' ', path.relative(cwd, _dest)));
          fs.outputFileSync(_dest, file);
        }
        break;
      default:
        console.log(' ', path.relative(cwd, _dest));
        fs.copySync(_path, _dest, {
          filter: function(file) {
            console.log(colors.blue(' ', path.relative(exampleDir, file)));
            return true;
          }
        });
    }
  });
};
