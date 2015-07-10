var path = require("path");
var Handlebars = require("handlebars");
var fs = require("fs-extra");
var Moment = require("moment");
var readTemplate = require("../reader/template");
var writeModules = require("../writer/modules");

var Template = (function() {
  function Template(opts, modules) {
    this.options = opts;    
    this.modules = modules;
    this.setTemplates();
    this.setCollection();
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
    render: function() {
      this.renderCollection(this.modules, this.category, "category");
      this.renderCollection(this.modules, this.tag, "tag");
    },
    setCollection: function() {
      this.category = this.createCollection(this.modules, "category");
      this.tag = this.createCollection(this.modules, "tag");
    },
    setTemplates: function() {
      _.each(this.templateType, function(type) {
        this.loadTemplateFile(type);
      }, this);
    },
    loadTemplateFile: function(type) {
      this.templates[type] = readTemplate(this.options.template, type);
    },
    renderCollection: function(modules, collection, type) {
      var categorizedModules = {};
      _.each(collection, function(name) {
        categorizedModules[name] = [];
      });
      
      _.each(modules, function(module) {
        _.each(module.config[type], function(name) {
          categorizedModules[name].push(module);
        });
      });
      
      _.each(categorizedModules, function(modules, name) {
        var outputPath = path.join(this.options.dest, type, name, "index.html");
        console.log(outputPath);
        this.renderLayout(modules, outputPath);
      }, this);
    },
    renderLayout: function(_modules, outputPath) {
      var root = this.getRoot(outputPath);      
      var modules = this.renderModules(_modules);
      var header = this.renderHeader(root);
      var footer = this.renderFooter(root);
      var sidemenu = this.renderSidemenu(root);
      var modulelist = this.renderModulelist(_modules);
      
      var layoutHtml = this.templates.layout({
        modules: modules,
        header: header,
        footer: footer,
        sidemenu: sidemenu,
        modulelist: modulelist,
      });
      writeModules(outputPath, layoutHtml);
    },
    write: function() {
      this.render();
    },
    renderModules: function(modules) {
      var html = _.map(modules, function(module) {
        return this.templates.module(module);
      }, this).join("\n");
      return html;
    },
    renderHeader: function(root) {
      return this.templates.header({root: root});
    },
    renderFooter: function(root) {
      var timestamp = Moment().format(this.options.timestamp_format);
      return this.templates.footer({root: root, timestamp: timestamp});
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
      return this.templates.modulelist({modules: modules});
    },
    getCategoryName: function(category) {
      return category.indexOf("/") === -1 ? category : _.last(category.split("/"));
    },
    getRoot: function(outputPath) {
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
