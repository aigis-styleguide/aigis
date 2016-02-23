var _ = require('underscore');
var marked = require('marked');
var path = require('path');
var system = require('./system');
var parser = require('./parser');
var reader = require('./reader');
var replaceCustomSyntax = require('./syntax');
var renderer = require('./renderer');
var writer = require('./writer');

var Aigis = (function() {
  function Aigis(configFile) {
    var options;

    try {
      if (_.isString(configFile)) {
        options = system.configLoader(configFile);
      }
      else {
        options = system.configParser(configFile);
      }
    }
    catch (e) {
      throw new Error(e);
    }
    var basedir = path.dirname(path.resolve(configFile));
    options = this.formatPaths(options, basedir);
    this.options = _.extend({}, system.DEFAULT_OPTIONS(basedir), options);
  }

  Aigis.prototype = {
    constructor: Aigis,

    formatPaths: function(options, basedir) {
      _.each(options, function(value, key) {
        switch(key) {
          case 'source':
          case 'dest':
          case 'dependencies':
          case 'module_dir':
          case 'index':
          case 'template_dir':
          case 'plugin':
            if (_.isArray(value)) {
              options[key] = _.map(value, function(v) {
                return path.join(basedir, v);
              });
            }
            else {
              options[key] = path.join(basedir, value);
            }
        }
      });
      return options;
    },

    initialize: function() {
    },

    /*
    * @method run
    *
    * just run
    * */
    run: function() {
      reader.css(this.options.source)
        .then(this._getAllColors.bind(this))
        .then(parser.css)
        .then(this._setData.bind(this))
        .then(this._replaceCustomSyntax.bind(this))
        .then(this._transform.bind(this))
        .then(this._mdToHtml.bind(this))
        .then(this._render.bind(this))
        .then(this._copyAssets.bind(this))
        .then(this._write.bind(this))
        .catch(function(e) {
          console.error(e);
        });
    },

    /*
    * @method initialize
    *
    * to initialize plugin
    * also set category & tag collection to render pages
    * */
    _setData: function(modules) {
      this.plugin = require('./plugin')(this.options);
      this.options.category = system.collector(modules, 'category');
      this.options.tag = system.collector(modules, 'tag');
      return modules;
    },

    /*
    * @method _getAllColors
    *
    * get CSS color variables in CSS files.
    * */
    _getAllColors: function(files) {
      this.options.colors = parser.colors(files);
      return files;
    },

    /*
    * @method _mdToHtml
    *
    * compile HTML from Markdown
    * using marked custom renderer function
    * */
    _mdToHtml: function(modules) {
      var markedRenderer = new renderer.markdown(this.options);
      modules = _.map(modules, function(module) {
        module.html = marked(module.md, {renderer: markedRenderer});
        return module
      }, this);
      return modules;
    },

    _render: function(modules) {
      var template = renderer.template(modules, this.options);
      return template.render();
    },

    _write: function(pages) {
      writer.pages.write(pages);
      return pages;
    },

    /*
    * @method _copyAssets
    *
    * copy assets
    * */
    _copyAssets: function(pages) {
      system.assetsManager.copyAssets(this.options);
      return pages;
    },

    /*
    * @method _replaceCustomSyntax
    *
    * replace text for custom syntax
    * */
    _replaceCustomSyntax(modules) {
      modules = replaceCustomSyntax(modules, this.options);
      return modules;
    },

    /*
    * @method _transform
    *
    * transform function transform codeblock
    * */
    _transform: function(modules) {
      modules = this.plugin.applyTransforms(modules);
      return modules;
    }

  };

  return Aigis;
})();

module.exports = Aigis;
