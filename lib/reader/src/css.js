var _ = require('lodash');
var vfs = require('vinyl-fs');
var through = require('through2');
var path = require('path');
var Promise = require('bluebird');
var colors = require('colors/safe');

function css(options) {
  var files = [];
  var filePath = options.source;
  return new Promise(function(resolve, reject) {

    if (_.isArray(filePath)) {
      filePath = _(filePath)
        .map(function(_path) {
          var ext = path.extname(_path);
          if (ext.length === 0) {
            return _.map(options.source_type, function(ext) {
              return path.normalize(_path + '/**/*' + ext);
            });
          }
          else {
            return _path;
          }
        })
        .flatten()
        .value();
    }
    else {
      if (path.extname(filePath).length === 0) {
        filePath = _.map(options.source_type, function(ext) {
          return path.normalize(filePath + '/**/*' + ext);
        });
      }
    }

    vfs.src(filePath)
      .on('end', function() {
        resolve(files)
      })
      .pipe(load());
  });


  function load() {
    return through.obj(function(file, enc, cb) {
      if (options.log) {
        console.log(colors.blue('[Log]', file.path));
      }
      this.push(file);
      files.push(file);
      cb();
    });
  }
}

module.exports = css;
