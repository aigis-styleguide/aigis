var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');

var AssetsManager = (function() {
  function AssetsManager() {

  }

  AssetsManager.prototype.copy = function(src, dest) {
    fs.copySync(src, path.join(dest, path.basename(src)));
  };

  AssetsManager.prototype.delete = function(src) {
    fs.removeSync(src);
  };

  AssetsManager.prototype.copyAssets = function(options) {
    var src = options.dependencies;
    var dest = options.dest;
    this.delete(dest);
    if (_.isArray(src)) {
      _.each(src, function(src) {
        this.copy(src, dest);
      }, this);
    }
    else {
      this.copy(src, dest);
    }
  };
  return AssetsManager;
})();

module.exports = new AssetsManager();
