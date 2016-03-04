var jade = require('jade');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require("moment");
var AigisTemplateHelper = require('aigis-template-helper');
var AigisMarked = require('aigis-marked');
var marked = require('marked');
var util = require('util');

var JADE_Renderer = (function() {
  function JADE_Renderer(modules, options) {
    this.options = options;
    this.modules = modules;
    this.initialize();
  }

  JADE_Renderer.prototype = {
    constructor: JADE_Renderer,

    initialize: function() {
      var collection = {};
      _.each(this.options.output_collection, function(type) {
        collection[type] = this.categorize(type);
      }, this);
      this.collection = collection;
      this.timestamp = this.getTimestamp(this.options);
      this.layoutTemplate = this.loadTemplate('layout.jade');
      this.indexTemplate = this.loadTemplate('index.jade');
      this.helper = new AigisTemplateHelper(this.options);
    },

    loadTemplate: function(fileName) {
      var filePath = path.join(this.options.template_dir, fileName);
      try {
        var template = fs.readFileSync(filePath, 'utf-8');
        return jade.compile(template, {filename: filePath, pretty: true});
      }
      catch(e) {
        throw new Error(e);
      }
    },

    render: function() {
      var pages = _.map(_.keys(this.collection), function(type) {
        return this.renderCollection(this.collection[type], type);
      }, this);
      pages = _.flatten(pages);

      return this.renderSpecialPages(pages);
    },

    renderPage: function(params) {
      var type = params.type, name = params.name, modules = params.modules;
      var outputPath = path.join(this.options.dest, type, name, 'index.html');
      var root = this.getRoot(outputPath, this.options);

      this.helper.setProperty({
        collection: this.options.collection,
        root: root
      });

      var page = this.layoutTemplate({
        modules: modules,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: this.helper
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
      if (this.options.color_palette) {
        pages.push(this.renderColors());
      }
      return pages;
    },

    renderIndex: function() {
      var markedRenderer = new AigisMarked(this.options);
      var md = '', html = '';
      if(this.options.index) {
        md = fs.readFileSync(this.options.index, 'utf-8');
        html = marked(md, {renderer: markedRenderer});
      }
      var root = './';
      var outputPath = path.join(this.options.dest, 'index.html');

      this.helper.setProperty({
        collection: this.options.collection,
        root: root
      });

      var indexPage = this.indexTemplate({
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: this.helper,
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

      this.helper.setProperty({
        category: this.options.category,
        root: root
      });

      var partial =
        '<div class="aigis-colorPalette">' +
        '<div class="aigis-colorPalette__color" style="background-color: %s;"></div>' +
        '<div class="aigis-colorPalette__label">%s</div>' +
        '</div>';

      var html = _.map(this.options.colors, function(color) {
        return util.format(partial, color, color);
      }).join('\n');

      this.helper.setProperty({
        collection: this.options.collection,
        root: root
      });

      var indexPage = this.indexTemplate({
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: this.helper,
        title: 'All Colors'
      });

      return {
        html: indexPage,
        outputPath: outputPath
      };
    },

    categorize: function(type) {
      var categorizedModules = {};
      _.each(this.options.collection[type], function(name) {
        categorizedModules[name] = [];
      });
      _.each(this.modules, function(module) {
        if (_.isUndefined(module.config[type])) return;
        var category;
        if (_.isArray(module.config[type])) {
          category = module.config[type];
        }
        else {
          category = [module.config[type]]
        }
        _.each(category, function(name) {
          categorizedModules[name].push(module);
        });
      });

      return categorizedModules;
    },

    getRoot: function(outputPath, options) {
      var level = _.compact(outputPath
          .replace(path.normalize(options.dest + '/'), '')
          .replace('index.html', '')
          .split('/')
      ).length;
      var root = '';
      if (level === 0) {
        return './';
      }

      for(var i = 0; i < level; i++) {
        root += '../';
      }

      return root;
    },
    getTimestamp: function(options) {
      return Moment().format(options.timestamp_format);
    }
  };

  return JADE_Renderer;
})();

module.exports = JADE_Renderer;

