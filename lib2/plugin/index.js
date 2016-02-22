var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
//
//module.exports = {
//  engine: {
//    ejs: require('./src/engine/ejs')
//  },
//
//  transform: {
//    html: require('./src/transform/html'),
//    coffee: require('./src/transform/coffee'),
//    jade: require('./src/transform/jade'),
//    js: require('./src/transform/js'),
//  }
//};

var Plugin = (function() {
  function Plugin() {
    this.engine = {};
    this.transform = {};
    this.initialize();
  }

  Plugin.prototype = {
    constructor: Plugin,

    initialize: function() {
      this._loadTransforms();
      this._loadEngines()
    },

    register: function(plugin) {
      var name = plugin.name, fn = plugin.fn, type = plugin.type;
      this[type][name] = fn;
    },

    get: function(type, name) {
      return this[type][name].fn;
    },

    _loadTransforms: function() {
      var baseDir = path.resolve(__dirname + '/src');
      var files = fs.readdirSync(baseDir + '/transform');

      _.each(files, function(filename) {
        var ext = path.extname(filename);
        var name = path.basename(filename, ext);
        this.register({
          type: 'transform',
          name: name,
          fn: require('./src/transform/' + filename)
        });
      }, this);
    },

    _loadEngines: function() {
      var baseDir = path.resolve(__dirname + '/src');
      var files = fs.readdirSync(baseDir + '/engine');

      _.each(files, function(filename) {
        var ext = path.extname(filename);
        var name = path.basename(filename, ext);
        this.register({
          type: 'engine',
          name: name,
          fn: require('./src/engine/' + filename)
        });
      }, this);
    }

  };

  return Plugin;
})();

module.exports = new Plugin();
