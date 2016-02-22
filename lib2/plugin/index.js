var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

var Plugin = (function() {
  function Plugin(options) {
    this.options = options;
    this.engine = {};
    this.transform = {};
    this.initialize();
  }

  Plugin.prototype = {
    constructor: Plugin,

    initialize: function() {
      this._loadBuiltinPlugins('transform');
      this._loadBuiltinPlugins('engine');
      this._loadUserPlugin('transform');
      this._loadUserPlugin('engine');
    },

    register: function(plugin) {
      this[plugin.type][plugin.name] = plugin.fn;
    },

    get: function(type, name) {
      return this[type][name];
    },

    _loadBuiltinPlugins: function(type) {
      var baseDir = path.resolve(__dirname + '/src');
      var files = fs.readdirSync(path.join(baseDir, type));
      this._bulkRegister(files, type, path.join(baseDir, type));
    },

    _bulkRegister: function(files, type, dirname) {
      _.each(files, function(filename) {
        var ext = path.extname(filename);
        var name = path.basename(filename, ext);
        this.register({
          type: type,
          name: name,
          fn: require(path.join(dirname, filename))
        })
      }, this);
    },

    _loadUserPlugin: function(type) {
      var baseDir = path.resolve(this.options.plugin);
      var files;
      try {
        files = fs.readdirSync(path.join(baseDir, type));
        this._bulkRegister(files, type, path.join(baseDir, type));
      }
      catch (e) {}
    }
  };

  return Plugin;
})();

//module.exports = new Plugin();
module.exports = function(options) {
  return new Plugin(options);
};
