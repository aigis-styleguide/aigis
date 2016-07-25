var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require('moment');
var AigisTemplateHelper = require('../helper');
var AigisMarked = require('aigis-marked');
var marked = require('marked');
var util = require('util');
var assign = require('object-assign');

var Renderer = (function() {
  function Renderer(components, options) {
    this.options = options;
    this.components = components;
    this.initialize();
  }

  assign(Renderer.prototype, {
    initialize: function() {
      this.timestamp = this._getTimestamp();
      this.indexTemplate = this._loadTemplate('index');
      this.helper = new AigisTemplateHelper(this.options);
      this.markedRenderer = new AigisMarked(this.options);
    },

    render: function() {
      var collection = {};
      _.each(this.options.output_collection, function(type) {
        collection[type] = this._categorizeByType(type);
      }, this);

      var pages = _.map(_.keys(collection), function(type) {
        return this._renderCollection(collection[type], type);
      }, this);

      pages = _.flatten(pages);
      pages.push(this._renderIndex());
      if (this.options.color_palette) {
        pages.push(this._renderColors());
      }
      return pages;
    },

    _renderPage: function(params) {
      var type = params.type, name = params.name || '', components = params.components || [], html = params.html || '';
      var title = params.title || name;
      var fileName = params.fileName || 'index.html';
      var template = this.indexTemplate;
      name = name.replace(/\s+/g, '-');
      var outputPath = path.join(this.options.dest, type, name, fileName);
      var root = params.isIndex ? './' : this._getRoot(outputPath);
      var outputRelPath = path.relative(this.options.dest, outputPath)

      this.helper.setProperty({
        collection: this.options.collection,
        root: root,
        outputPath: outputRelPath
      });

      components = _.map(components, function(component) {
        component.html = marked(component.md, {renderer: this.markedRenderer});
        return component
      }, this);

      var page = template({
        components: components,
        html: html,
        config: this.options,
        timestamp: this.timestamp,
        title: title,
        root: root,
        helper: this.helper,
        outputPath: outputRelPath
      });

      return {
        html: page,
        outputPath: outputPath
      }
    },

    _renderIndex: function() {
      var md = '', html = '';
      if(this.options.index) {
        md = fs.readFileSync(this.options.index, 'utf-8');
        html = marked(md, {renderer: this.markedRenderer});
      }
      var page = this._renderPage({
        title: 'index',
        type: '',
        html: html,
        isIndex: true,
        fileName: 'index.html'
      });
      return page;
    },

    _renderColors: function() {
      var html = '';
      var partial =
        '<div class="aigis-colorPalette">' +
          '<div class="aigis-colorPalette__color" style="background-color: %s;"></div>' +
          '<div class="aigis-colorPalette__label">%s</div>' +
        '</div>';

      var html = _.map(this.options.colors, function(color) {
        return util.format(partial, color, color);
      }).join('\n');

      var page = this._renderPage({
        title: 'colors',
        type: '',
        html: html,
        isIndex: true,
        fileName: 'color.html'
      });
      return page;
    },

    _renderCollection: function(categorizedModules, type) {
      var pages = _.map(categorizedModules, function(components, name) {
        return this._renderPage({
          components: components,
          name: name,
          type: type,
        });
      }, this);
      return pages;
    },

    _loadTemplate: function(fileName) {
      var ext = this.options.template_ext[this.options.template_engine];
      var filePath = path.join(this.options.template_dir, fileName + ext);
      try {
        var template = fs.readFileSync(filePath, 'utf-8');
        return ejs.compile(template, {filename: filePath});
      }
      catch(e) {
        throw new Error(e);
      }
    },

    /*
    * @method _categorizeByType
    *
    * categorize components by output_collection option
    * */
    _categorizeByType: function(type) {
      var categorizedModules = {};
      _.each(this.options.collection[type], function(name) {
        categorizedModules[name] = [];
      });
      _.each(this.components, function(component) {
        if (_.isUndefined(component.config[type])) return;
        var category;
        if (_.isArray(component.config[type])) {
          category = component.config[type];
        }
        else {
          category = [component.config[type]]
        }
        _.each(category, function(name) {
          categorizedModules[name].push(component);
        });
      });

      return categorizedModules;
    },

    _getRoot: function(outputPath) {
      var level = _.compact(outputPath
          .replace(path.normalize(this.options.dest + '/'), '')
          .replace('index.html', '')
          .split(path.sep)
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

    _getTimestamp: function() {
      return Moment().format(this.options.timestamp_format);
    }

  });

  return Renderer;
})();

module.exports = Renderer;
