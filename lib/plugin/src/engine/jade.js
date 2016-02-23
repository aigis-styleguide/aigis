var jade = require('jade');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require("moment");
var system = require('../../../system');
var reader = require('../../../reader');
var helper = require('../../../renderer/helper');
var renderer = require('../../../renderer');
var marked = require('marked');
var util = require('util');

var JADE_Renderer = (function() {
  function JADE_Renderer(modules, options) {
    this.options = options;
    this.modules = modules;
    this.timestamp = system.timestamp.get(options);
    this.layoutTemplate = reader.jade(path.join(options.template_dir, 'layout.jade'));
    this.collection = {
      category: this.categorize('category'),
      tag: this.categorize('tag')
    }
  }

  JADE_Renderer.prototype = {
    constructor: JADE_Renderer,

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
//      pages.push(this.renderColors());
      return pages;
    },

    renderIndex: function() {
      var markedRenderer = new renderer.markdown(this.options);
      var md = '', html = '';
      if(this.options.index) {
        md = fs.readFileSync(this.options.index, 'utf-8');
        html = marked(md, {renderer: markedRenderer});
      }
      var templatePath = path.join(this.options.template_dir, 'index.jade');
      var indexTemplate = reader.jade(templatePath);
      var root = './';
      var outputPath = path.join(this.options.dest, 'index.html');
      helper.init(this.options, root);

      var indexPage = indexTemplate({
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
      var templatePath = path.join(this.options.template_dir, 'index.jade');
      var indexTemplate = reader.jade(templatePath);
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

      var indexPage = indexTemplate({
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

  return JADE_Renderer;
})();

module.exports = JADE_Renderer;

