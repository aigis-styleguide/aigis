var fs = require("fs-extra");
var path = require("path");
var Promise = require("bluebird");

var AssetsManager = (function() {
  function AssetsManager(opts) {
    this.dest = opts.dest;
  }

  AssetsManager.prototype.copy = function(src) {
    fs.copySync(src, path.join(this.dest, path.basename(src)));
  };

  AssetsManager.prototype.delete = function(src) {
    fs.removeSync(src);
  };

  AssetsManager.prototype.copyAssets = function(src) {
    return new Promise(function(resolve, reject) {
      this.delete(this.dest);
      if (_.isArray(src)) {
        _.each(src, function(src) {
          this.copy(src);
        }, this);
      }
      else {
        this.copy(src);
      }
      resolve();
    });
  };
  return AssetsManager;
})();

module.exports = AssetsManager;
