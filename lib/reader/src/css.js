var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var colors = require('colors/safe');
var glob = require('glob');
var fs = require('fs-extra');

function css(options) {
  var sourcePath = options.source;

  if (_.isArray(sourcePath)) {
    // e.g, source:
    //   - /css
    sourcePath = _(sourcePath)
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
    if (path.extname(sourcePath).length === 0) {
      // e.g, source: /css
      sourcePath = _.map(options.source_type, function(ext) {
        return path.normalize(sourcePath + '/**/*' + ext);
      });
    }else {
      // e.g, source: ./hoge.css
      sourcePath = [sourcePath];
    }
  }
  var paths = _.flatten(_.map(sourcePath, function(_path) {
    // if not glob pattern comes, just return file path
    if (_path.indexOf('*') === -1 ) {
      return _path;
    }
    return glob.sync(_path);
  }));

  return Promise.all(_.map(paths, function(_path) {
    return new Promise(function(resolve, reject) {
      fs.readFile(_path, function(err, data) {
        if (err) reject();
        resolve({
          contents: data,
          path: _path
        });
      });
    });
  }));
}

module.exports = css;
