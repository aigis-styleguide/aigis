var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var Moment = require("moment");
var system = require('../../../system');
var reader = require('../../../reader');
var helper = require('../../../renderer/helper');

var EJS_Renderer = (function() {
  function EJS_Renderer(options, modules) {
    this.options = options;
    this.modules = modules;
    this.timestamp = system.timestamp.get(options);
    this.indexTemplate = reader.ejs(options);
  }

  EJS_Renderer.prototype = {
    constructor: EJS_Renderer,

    render: function() {
      return this.renderPage({
        modules: this.modules,
        type: 'category',
        name: 'hoge'
      });
    },

    renderPage: function(params) {
      var type = params.type, name = params.name, modules = params.modules;
      var outputPath = path.join(this.options.dest, type, name, 'index.html');
      var root = system.getRoot(outputPath, this.options);
      helper.init(this.options, root);

      var page = this.indexTemplate({
        modules: modules,
        config: this.options,
        timestamp: this.timestamp,
        root: root,
        helper: helper
      });

      return page;
    }
  };

  return EJS_Renderer;
})();

module.exports = EJS_Renderer;

