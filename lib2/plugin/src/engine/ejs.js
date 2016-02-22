var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require("moment");
var system = require('../../../system');
var reader = require('../../../reader');
var helper = require('../../../renderer/helper');
var renderer = require('../../../renderer');
var marked = require('marked');

var EJS_Renderer = (function() {
  function EJS_Renderer(modules, options) {
    this.options = options;
    this.modules = modules;
    this.timestamp = system.timestamp.get(options);
    this.layoutTemplate = reader.ejs(options.template);
    this.collection = {
      category: this.categorize('category'),
      tag: this.categorize('tag')
    }
  }

  EJS_Renderer.prototype = {
    constructor: EJS_Renderer,

    render: function() {
      var pages = _.map(['category', 'tag'], function(type) {
        return this.renderCollection(this.collection[type], type);
      }, this);
      pages = _.flatten(pages);

      return this.renderSpecialPages(pages);
    },

    renderPage: function(params) {
      var type = params.type, name = params.name, modules = params.modules;
      var outputPath = path.join(this.options.dest, type, name, 'index.html');
      var root = system.getRoot(outputPath, this.options);
      helper.init(this.options, root);

      var page = this.layoutTemplate({
        modules: modules,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: helper
      });

      return {
        html: page,
        outputPath: outputPath
      };
    },

    renderCollection: function(categorizedModules, type) {
      var pages = _.map(categorizedModules, function(modules, name) {
        return this.renderPage({
          modules: modules,
          name: name,
          type: type
        });
      }, this);

      return pages;
    },

    renderSpecialPages: function(pages) {
      var markedRenderer = new renderer.markdown(this.options);
      var md = '', html = '';
      if(this.options.index) {
        md = fs.readFileSync(path.resolve(this.options.index), 'utf-8');
        html = marked(md, {renderer: markedRenderer});
      }
      var templatePath = path.join(path.dirname(this.options.template), 'index.ejs');
      var indexTemplate = reader.ejs(templatePath);
      var root = './';
      var outputPath = path.join(this.options.dest, 'index.html');
      helper.init(this.options, root);

      var page = indexTemplate({
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: helper
      });

      pages.push({
        html: page,
        outputPath: outputPath
      });
      return pages;
    },

    categorize: function(type) {
      var categorizedModules = {};
      _.each(this.options[type], function(name) {
        categorizedModules[name] = [];
      });
      _.each(this.modules, function(module) {
        _.each(module.config[type], function(name) {
          categorizedModules[name].push(module);
        });
      });

      return categorizedModules;
    }
  };

  return EJS_Renderer;
})();

module.exports = EJS_Renderer;

