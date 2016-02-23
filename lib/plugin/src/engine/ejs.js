var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require("moment");
var system = require('../../../system');
var helper = require('../../../renderer/helper');
var renderer = require('../../../renderer');
var marked = require('marked');
var util = require('util');

var EJS_Renderer = (function() {
  function EJS_Renderer(modules, options) {
    this.options = options;
    this.modules = modules;
    this.initialize();
  }

  EJS_Renderer.prototype = {
    constructor: EJS_Renderer,

    initialize: function() {
      this.collection = {
        category: this.categorize('category'),
        tag: this.categorize('tag')
      };
      this.timestamp = system.timestamp.get(this.options);
      this.layoutTemplate = this.loadTemplate('layout.ejs');
      this.indexTemplate = this.loadTemplate('index.ejs');
    },

    loadTemplate: function(fileName) {
      var filePath = path.join(this.options.template_dir, fileName);
      var template = fs.readFileSync(filePath, 'utf-8');
      return ejs.compile(template, {filename: filePath});
    },

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
      pages.push(this.renderIndex());
      pages.push(this.renderColors());
      this.renderColors();
      return pages;
    },

    renderIndex: function() {
      var markedRenderer = new renderer.markdown(this.options);
      var md = '', html = '';
      if(this.options.index) {
        md = fs.readFileSync(this.options.index, 'utf-8');
        html = marked(md, {renderer: markedRenderer});
      }

      var root = './';
      var outputPath = path.join(this.options.dest, 'index.html');
      helper.init(this.options, root);

      var indexPage = this.indexTemplate({
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: helper,
        title: 'Index'
      });

      return {
        html: indexPage,
        outputPath: outputPath
      };
    },

    renderColors: function() {
      var html = '';
      var root = './';
      var outputPath = path.join(this.options.dest, 'color.html');
      helper.init(this.options, root);

      var partial =
        '<div class="aigis-colorPalette">' +
          '<div class="aigis-colorPalette__color" style="background-color: %s;"></div>' +
          '<div class="aigis-colorPalette__label">%s</div>' +
        '</div>';

      var html = _.map(this.options.colors, function(color) {
        return util.format(partial, color, color);
      }).join('\n');

      var indexPage = this.indexTemplate({
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: helper,
        title: 'All Colors'
      });

      return {
        html: indexPage,
        outputPath: outputPath
      };
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

