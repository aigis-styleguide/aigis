var hbs = require('handlebars');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var assign = require('object-assign');
var util = require('util');
var base = require('./base');

var HBS_Renderer = (function() {
  function HBS_Renderer(modules, options) {
    this.options = options;
    this.modules = modules;
    this.initialize();
  }

  util.inherits(HBS_Renderer, base);

  assign(HBS_Renderer.prototype, {
    initialize: function() {
      base.prototype.initialize.call(this);
      var _this = this;
      hbs.registerHelper('include', function(includePath, options) {
        var template = _this._loadTemplate(includePath);
        return new hbs.SafeString(template(this));
      });

      hbs.registerHelper('renderCategoryTree', function(options) {
        _this.helper.setProperty({
          category: _this.options.collection.category,
          root: options.data.root.root
        });
        return _this.helper.renderCategoryTree();
      });
    },
    _loadTemplate: function(fileName) {
      var ext = this.options.template_ext[this.options.template_engine];
      var filePath = path.join(this.options.template_dir, fileName + ext)
      try {
        var template = fs.readFileSync(filePath, 'utf-8');
        return hbs.compile(template);
      }
      catch(e) {
        throw new Error(e);
      }
    }
  });

  return HBS_Renderer;
})();

module.exports = HBS_Renderer;
//
//
//
//
//var hbs = require('handlebars');
//var fs = require('fs-extra');
//var path = require('path');
//var _ = require('lodash');
//var Moment = require("moment");
//var AigisTemplateHelper = require('aigis-template-helper');
//var AigisMarked = require('aigis-marked');
//var marked = require('marked');
//var util = require('util');
//
//var HandlebarsRenderer = (function() {
//  function HandlebarsRenderer(modules, options) {
//    this.options = options;
//    this.modules = modules;
//    this.initialize();
//  }
//
//  HandlebarsRenderer.prototype = {
//    constructor: HandlebarsRenderer,
//
//    initialize: function() {
//      function loadTemplate(templatePath) {
//        try{
//          var template = fs.readFileSync(templatePath, 'utf-8')
//          return hbs.compile(template);
//        }
//        catch(e) {
//          throw new Error(e);
//        }
//      }
//
//      function renderTemplate(templatePath, data) {
//        var tmpl = loadTemplate(templatePath, 'utf-8');
//        return tmpl(data);
//      }
//
//      this.timestamp = this.getTimestamp(this.options);
//      this.helper = new AigisTemplateHelper(this.options);
//      this.collection = {
//        category: this.categorize('category'),
//        tag: this.categorize('tag')
//      };
//      this.layoutTemplate = loadTemplate(path.join(this.options.template_dir, 'layout.hbs'));
//      this.indexTemplate = loadTemplate(path.join(this.options.template_dir, 'index.hbs'));
//
//      hbs.registerHelper('include', function(includePath, options) {
//        var templatePath = path.join(options.data.root.dir, includePath);
//        return new hbs.SafeString(renderTemplate(templatePath, this));
//      });
//
//      hbs.registerHelper('renderCategoryTree', function(options) {
//        this.helper.setProperty({
//          category: this.options.category,
//          root: options.data.root.root
//        });
//        return this.helper.renderCategoryTree();
//      }.bind(this));
//    },
//
//    render: function() {
//      var pages = _.map(['category', 'tag'], function(type) {
//        return this.renderCollection(this.collection[type], type);
//      }, this);
//      pages = _.flatten(pages);
//
//      return this.renderSpecialPages(pages);
//    },
//
//    renderCollection: function(categorizedModules, type) {
//      var pages = _.map(categorizedModules, function(modules, name) {
//        return this.renderPage({
//          modules: modules,
//          name: name,
//          type: type
//        });
//      }, this);
//
//      return pages;
//    },
//
//    renderPage: function(params) {
//      var type = params.type, name = params.name, modules = params.modules;
//      var outputPath = path.join(this.options.dest, type, name, 'index.html');
//      var root = this.getRoot(outputPath, this.options);
//
//      var page = this.layoutTemplate({
//        modules: modules,
//        config: this.options,
//        timestamp: this.timestamp,
//        root: root,
//        dir: this.options.template_dir
//      });
//
//      return {
//        html: page,
//        outputPath: outputPath
//      }
//    },
//
//    renderSpecialPages: function(pages) {
//      pages.push(this.renderIndex());
//      if (this.options.color_palette) {
//        pages.push(this.renderColors());
//      }
//      return pages;
//    },
//
//    renderIndex: function() {
//      var markedRenderer = new AigisMarked(this.options);
//      var md = '', html = '';
//      if(this.options.index) {
//        md = fs.readFileSync(this.options.index, 'utf-8');
//        html = marked(md, {renderer: markedRenderer});
//      }
//
//      var root = './';
//      var outputPath = path.join(this.options.dest, 'index.html');
//
//      var indexPage = this.indexTemplate({
//        html: html,
//        config: this.options,
//        timestamp: this.timestamp,
//        root: root,
//        title: 'Index',
//        dir: this.options.template_dir
//      });
//
//      return {
//        html: indexPage,
//        outputPath: outputPath
//      };
//    },
//
//    renderColors: function() {
//      var html = '';
//      var root = './';
//      var outputPath = path.join(this.options.dest, 'color.html');
//
//      var partial =
//        '<div class="aigis-colorPalette">' +
//        '<div class="aigis-colorPalette__color" style="background-color: %s;"></div>' +
//        '<div class="aigis-colorPalette__label">%s</div>' +
//        '</div>';
//
//      var html = _.map(this.options.colors, function(color) {
//        return util.format(partial, color, color);
//      }).join('\n');
//
//      var indexPage = this.indexTemplate({
//        html: html,
//        config: this.options,
//        timestamp: this.timestamp,
//        root: root,
//        title: 'All Colors',
//        dir: this.options.template_dir
//      });
//
//      return {
//        html: indexPage,
//        outputPath: outputPath
//      };
//    },
//
//    categorize: function(type) {
//      var categorizedModules = {};
//      _.each(this.options[type], function(name) {
//        categorizedModules[name] = [];
//      });
//      _.each(this.modules, function(module) {
//        _.each(module.config[type], function(name) {
//          categorizedModules[name].push(module);
//        });
//      });
//
//      return categorizedModules;
//    },
//
//    getRoot: function(outputPath, options) {
//      var level = _.compact(outputPath
//          .replace(path.normalize(options.dest + '/'), '')
//          .replace('index.html', '')
//          .split('/')
//      ).length;
//      var root = '';
//      if (level === 0) {
//        return './';
//      }
//
//      for(var i = 0; i < level; i++) {
//        root += '../';
//      }
//
//      return root;
//    },
//    getTimestamp: function(options) {
//      return Moment().format(options.timestamp_format);
//    }
//  };
//
//  return HandlebarsRenderer;
//})();
//
//module.exports = HandlebarsRenderer;
