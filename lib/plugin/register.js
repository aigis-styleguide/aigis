var _ = require("lodash");
var path = require("path");

var PluginRegister = (function() {
  var PluginRegister = function(opts) {
    var _this = this;
    this.plugins = {
      injector: [],
      renderer: [],
    };

    _.each(opts.injector, function(config) {
      _this.add(config, "injector");
    });

  };

  PluginRegister.prototype = {
    constructor: PluginRegister,

    add: function(opts, type) {
      var resolvePath = path.resolve(opts.path);

      this.plugins[type].push({
        name: opts.name,
        path: resolvePath,
        fn: require(resolvePath),
      });
    },

    get: function(name, type) {
      var plug = _.findLast(this.plugins[type], {"name": name});

      if (plug) {
        return plug.fn;
      }
      else {
        return false;
      }
    },
    getInjector: function(name, type) {
      return this.get(name, "injector");
    }
  };

  return PluginRegister;
})();

module.exports = PluginRegister;
