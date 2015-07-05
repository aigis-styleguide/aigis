var namespace = require("./app/namespace");
var DEFAULT_OPTIONS = require("./app/options");
var PluginRegister = require("./plugin/register");

var Aigis = (function() {
  function Aigis(opts) {
    this.options = _.extend({}, DEFAULT_OPTIONS, opts);
    
    this.initPlugins();
    
    mediator.once(Event.END_LOAD_CSS_FILES, this._onEndLoadCssFiles.bind(this));
  }
  
  Aigis.prototype = {
    constructor: Aigis,
    
    run: function() {
      this.readCSSFiles(this.options.source);
    },
    readCSSFiles: require("./reader/css"),
    parseCSS: require("./parser/css"),
    createCollection: require("./parser/collection"),
    
    _onEndLoadCssFiles: function(files) {
      this.comments = this.parseCSS(files);
      this.categoryList = this.createCollection(this.comments, "category");
      this.tagList = this.createCollection(this.comments, "tag");
      
      // this.pluginRegister.add({
      //   name: "html", path: "./injector/html"
      // });
      // 
      this.injection();
      // 
      // var html = this.pluginRegister.getInjector("html");
      // html(this.comments);
      // console.log(this.comments);
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
        injector(this.comments);
      }, this);
    },
    
  };
  return Aigis;
})();


module.exports = Aigis;
