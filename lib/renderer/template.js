var path = require("path");
var Handlebars = require("handlebars");
var fs = require("fs-extra");
var Moment = require("moment");

var Template = (function() {
  function Template(opts, modules) {
    this.options = opts;    
    this.modules = modules;
    this.initialize();
  }
  
  Template.prototype = {
    createCollection: require("../parser/collection"),
    templateType: [
      "module",
      "modules",
      "modulelist",
      "layout",
      "header",
      "footer",
      "sidemenu",
    ],
    templates: {},
    initialize: function() {
      _.each(this.templateType, function(type) {
        this.loadTemplateFile(type);
      }, this);
      this.category = this.createCollection(this.modules, "category");
      this.tag = this.createCollection(this.modules, "tag");
      this.categorized();
    },
    loadTemplateFile: function(type) {
      var filePath = path.resolve(path.join(this.options.template, type + ".hbs"));
      this.templates[type] = Handlebars.compile(fs.readFileSync(filePath, "utf8"));
    },
    renderModule: function() {
      
    },
    categorized: function(modules, categoryList) {
      var categorized = {};
      _.each(this.category, function(category) {
        categorized[category] = [];
      });
      
      _.each(this.modules, function(module) {
        _.each(module.config.category, function(category) {
          categorized[category].push(module);
        });
      });
      
      console.log(_.keys(categorized));
      
      _.each(categorized, function(modules, name) {
        // var html = _.map(modules, function(module) {
        //   return this.templates.module(module);
        // }, this).join("\n");
        // 
        var outputPath = path.join(this.options.dest, "category", name, "index.html");
        
        this.renderLayout(modules, outputPath);
        // this.renderLayout({outputPath: outputPath, modulesHtml: html});
      }, this);
      
      
    },
    renderLayout: function(_modules, outputPath) {
      // var outputPath = opts.outputPath;
      var root = this.levelManager(outputPath);
      
      var modules = this.renderModules(_modules);
      var header = this.renderHeader(root);
      var footer = this.renderFooter(root);
      var sidemenu = this.renderSidemenu(root);
      var modulelist = this.renderModulelist(_modules);
      // console.log(sidemenu);
      var layoutHtml = this.templates.layout({
        modules: modules,
        header: header,
        footer: footer,
        sidemenu: sidemenu,
        modulelist: modulelist,
      });
      
      fs.outputFileSync(outputPath, layoutHtml);
    },
    renderModules: function(modules) {
      var html = _.map(modules, function(module) {
        return this.templates.module(module);
      }, this).join("\n");
      return html;
    },
    renderHeader: function(root) {
      var headerHtml = this.templates.header({root: root});
      return headerHtml;
    },
    renderFooter: function(root) {
      var timestamp = Moment().format(this.options.timestamp_format);
      var footerHtml = this.templates.footer({root: root, timestamp: timestamp});
      
      return footerHtml;
    },
    renderSidemenu: function(root) {
      var category = _.map(this.category, function(category) {
        var name = this.getCategoryName(category);
        var href = path.join(root, "category", category, "index.html");
        
        return {
          name: name,
          href: href,
        };
      }, this);
      
      var tag = _.map(this.tag, function(tag) {
        var name = tag;
        var href = path.join(root, "tag", tag, "index.html");
        
        return {
          name: name,
          href: href,
        };
      }, this);
      
      return this.templates.sidemenu({category: category, tag: tag});
    },
    renderModulelist: function(modules) {
      var html = this.templates.modulelist({modules: modules});
      return html;
    },
    getCategoryName: function(category) {
      return category.indexOf("/") === -1 ? category : _.last(category.split("/"));
    },
    levelManager: function(outputPath) {
      var level = _.compact(outputPath
            .replace(path.normalize(this.options.dest + "/"), "")
            .replace("index.html", "")
            .split("/")
          ).length;
      var dots = "";
      if (level === 0) {
        return "./";
      }
      
      for(var i = 0; i < level; i++) {
        dots += "../";
      }
      
      return dots;
    }
  };
  
  return Template;
})();

module.exports = Template;
