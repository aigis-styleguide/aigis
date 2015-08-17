var marked = require("marked");
var fs = require("fs-extra");
var path = require("path");
var _ = require("lodash");

var DEFAULT_OPTIONS = require("./app/options");
var PluginRegister = require("./plugin/register");
var MarkedCustomRenderer = require("./renderer/markdown");
var TemplateRenderer = require("./renderer/template");
var AssetsManager = require("./reader/assets");
var parseColor = require("./parser/color");
var readConfig = require("./reader/config");
var parseConfig = require("./parser/config");

var Aigis = (function() {
  function Aigis(configFile) {
    var opts;
    // config is String or Buffer which both is ok
    try {
      if (_.isString(configFile)) {
        opts = readConfig(configFile);
      }
      else {
        opts = parseConfig(configFile);
      }
    }
    catch (e){
      throw new Error(e);
    }
    this.options = _.extend({}, DEFAULT_OPTIONS, opts);

    if (this.options.index) {
      console.log("index: " + path.resolve(this.options.index));
    }

    this._initPlugins();
    this.markdownRenderer = new MarkedCustomRenderer(this.options);
  }

  Aigis.prototype = {
    constructor: Aigis,
    readCSSFiles: require("./reader/css"),
    parseCSS: require("./parser/css"),

    run: function() {
      this.readCSSFiles(this.options.source).then(this._setup.bind(this))
    },

    _setup: function(files) {
      this.modules = this.parseCSS(files);
      this.colors = parseColor(files);
      this._injection();
      this._mdToHTML();
      this._copyAssets()
      this._write();
    },

    _write: function() {
      var templateRenderer = new TemplateRenderer(this.options, this.modules, this.colors);
      templateRenderer.write();
    },

    _copyAssets: function() {
      var assetsManager = new AssetsManager(this.options);
      return assetsManager.copyAssets(this.options.dependencies);
    },

    _initPlugins: function() {
      this.plugins = new PluginRegister({
        injector: [
          {name: "html", path: __dirname + "/injector/html"},
          {name: "jade", path: __dirname + "/injector/jade"},
          {name: "coffee", path: __dirname + "/injector/coffee"},
          {name: "js", path: __dirname + "/injector/js"},
          {name: "css", path: __dirname + "/injector/css"},
        ]
      });
    },

    _injection: function() {
      var injectors = this.options.inject;
      _.each(injectors, function(injectorName) {
        var injector = this.plugins.getInjector(injectorName);
        injector(this.modules);
      }, this);
    },

    _mdToHTML: function() {
      _.each(this.modules, function(module) {
        module.html = marked(module.md, {renderer: this.markdownRenderer});
      }, this);
    },
  };
  return Aigis;
})();


module.exports = Aigis;
