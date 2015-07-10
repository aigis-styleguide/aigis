var namespace = require("./app/namespace");
var DEFAULT_OPTIONS = require("./app/options");
var PluginRegister = require("./plugin/register");
var MarkedCustomRenderer = require("./renderer/markdown");
var marked = require("marked");
var fs = require("fs-extra");
var path = require("path");
var Handlebars = require("handlebars");
var Template = require("./renderer/template");

var Aigis = (function() {
  function Aigis(opts) {
    this.options = _.extend({}, DEFAULT_OPTIONS, opts);
    
    this.initPlugins();
    this.markdownRenderer = new MarkedCustomRenderer(this.options);
    this.eventify();
  }
  
  Aigis.prototype = {
    constructor: Aigis,
    readCSSFiles: require("./reader/css"),
    parseCSS: require("./parser/css"),
    renderModule: require("./renderer/module"),
    eventify: function() {
      mediator.once(Event.END_LOAD_CSS_FILES, this._onEndLoadCSSFiles.bind(this));
    },
    run: function() {
      this.readCSSFiles(this.options.source);
    },    
    _onEndLoadCSSFiles: function(files) {
      this.modules = this.parseCSS(files);
      this.injection();
      this.mdToHTML();
      this.templateRenderer = new Template(this.options, this.modules);
      this.templateRenderer.write();
    },
    initPlugins: function() {
      this.plugins = new PluginRegister({
        injector: [
          {name: "html", path: __dirname + "/injector/html"},
          {name: "jade", path: __dirname + "/injector/jade"},
          {name: "coffee", path: __dirname + "/injector/coffee"},
          {name: "js", path: __dirname + "/injector/js"},
        ]
      });
    },
    injection: function() {
      var injectors = this.options.inject;
      _.each(injectors, function(injectorName) {
        var injector = this.plugins.getInjector(injectorName);
        injector(this.modules);
      }, this);
    },
    mdToHTML: function() {
      _.each(this.modules, function(module) {
        module.html = marked(module.md, {renderer: this.markdownRenderer});
      }, this);
    },
  };
  return Aigis;
})();


module.exports = Aigis;
