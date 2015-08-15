var _ = require("lodash");
var fs = require("fs-extra");
var path = require("path");

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
    this.delete(this.dest);
    if (_.isArray(src)) {
      _.each(src, function(src) {
        this.copy(src);
      }, this);
    }
    else {
      this.copy(src);
    }
  };
  return AssetsManager;
})();

module.exports = AssetsManager;
