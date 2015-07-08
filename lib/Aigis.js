var namespace = require("./app/namespace");
var DEFAULT_OPTIONS = require("./app/options");
var PluginRegister = require("./plugin/register");
var MarkedCustomRenderer = require("./renderer/markdown");
var marked = require("marked");
var fs = require("fs-extra");
var path = require("path");
var Handlebars = require("handlebars");
var Moment = require("moment");
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
    createCollection: require("./parser/collection"),
    renderModule: require("./renderer/module"),
    eventify: function() {
      mediator.once(Event.END_LOAD_CSS_FILES, this._onEndLoadCSSFiles.bind(this));
    },
    run: function() {
      this.readCSSFiles(this.options.source);
    },    
    _onEndLoadCSSFiles: function(files) {
      this.modules = this.parseCSS(files);
      this.categoryList = this.createCollection(this.modules, "category");
      this.tagList = this.createCollection(this.modules, "tag");
      this.injection();
      this.mdToHTML();
      this.renderTemplate();
      // console.log(this.modules[0].content);
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
      _.each(this.modules, function(comment) {
        comment.html = marked(comment.md, {renderer: this.markdownRenderer});
      }, this);
    },
    renderTemplate: function() {
      this.renderModule(this.options.template + "/module.hbs");
      // templaterendererクラスをつくってtemplateをキャッシュ
      // moduleのコンパイルも書き出す直前に都度やらないとパスが解決できない
      // 階層を示すlevelを設定して、その値から../とかを付与するレンダーを作る
      var headerTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/header.hbs", "utf8"));
      var footerTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/footer.hbs", "utf8"));
      var layoutTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/layout.hbs", "utf8"));
      var modulesTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/modules.hbs", "utf8"));
      var modulelistTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/modulelist.hbs", "utf8"));
      var sidemenuTmpl = Handlebars.compile(fs.readFileSync(this.options.template + "/sidemenu.hbs", "utf8"));
      
      var category = _.map(this.categoryList, function(name) {
        return {name: name, href: name + ".html"}
      });
      var tag = _.map(this.tagList, function(name) {
        return {name: name, href: name + ".html"}
      });
      
      var layoutHtml = layoutTmpl({
        modules: modulesTmpl({modules: this.modules}),
        modulelist: modulelistTmpl({modules: this.modules}),
        sidemenu: sidemenuTmpl({category: category, tag: tag}),
        header: headerTmpl(),
        footer: footerTmpl({timestamp: Moment().format(this.options.timestamp_format)})
      });
      
      var outputPath = path.normalize(this.options.dest + "/" + "hoge.html");
      console.log(outputPath);
      fs.outputFile(outputPath, new Buffer(layoutHtml));
    }    
  };
  return Aigis;
})();


module.exports = Aigis;
