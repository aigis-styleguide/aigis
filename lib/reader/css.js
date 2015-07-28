var vfs = require("vinyl-fs");
var through = require("through2");
var path = require("path");
var Support = require("../app/support");

function readCSSFiles(filePath) {
  var files = [];

  if (_.isArray(filePath)) {
    filePath = _(filePath)
      .map(function(_path) {
        var ext = path.extname(_path);
        if (ext.length === 0) {
          return _.map(Support.fileType, function(ext) {
            return path.normalize(_path + "/**/*" + ext);
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
      filePath = _.map(Support.fileType, function(ext) {
        return path.normalize(filePath + "/**/*" + ext);
      });
    }
  }

  vfs.src(filePath)
    .on("end", function() {
      endLoadFiles();
    })
    .pipe(load());

  function load() {
    return through.obj(function(file, enc, cb) {
      this.push(file);
      files.push(file);
      cb();
    });
  }

  function endLoadFiles() {
    mediator.emit(Event.END_LOAD_CSS_FILES, files);
  }
}

module.exports = readCSSFiles;
