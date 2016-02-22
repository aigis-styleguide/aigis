var _ = require('underscore');
var marked = require('marked');
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
    this.options = _.extend({}, system.DEFAULT_OPTIONS, options);
  }

  Aigis.prototype = {
    constructor: Aigis,

    run: function() {
      reader.css(this.options.source)
        .then(parser.css)
        .then(this.initialize.bind(this))
        .then(this._replaceCustomSyntax.bind(this))
        .then(this._transform.bind(this))
        .then(this._mdToHtml.bind(this))
        .then(this._render.bind(this))
        .then(this._copyAssets.bind(this))
        .then(this._write.bind(this))
        .then((pages) => {
//          console.log(pages[0]);
        })
        .catch(function(e) {
          console.error(e);
        });
    },

    initialize: function(modules) {
      this.plugin = require('./plugin')(this.options);
      this.options.category = system.collector(modules, 'category');
      this.options.tag = system.collector(modules, 'tag');
      return modules;
    },

    _mdToHtml: function(modules) {
      var markedRenderer =  new renderer.markdown(this.options);
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

    _copyAssets: function(pages) {
      system.assetsManager.copyAssets(this.options);
      return pages;
    },

    _replaceCustomSyntax(modules) {
      modules = replaceCustomSyntax(modules, this.options);
      return modules;
    },

    _transform: function(modules) {
      modules = this.plugin.applyTransforms(modules);
      return modules;
    }

  };

  return Aigis;
})();

module.exports = Aigis;
