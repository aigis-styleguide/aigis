var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var assign = require('object-assign');
var util = require('util');
var base = require('./base');

var EJS_Renderer = (function() {
  function EJS_Renderer(components, options) {
    this.options = options;
    this.components = components;
    this.initialize();
  }

  util.inherits(EJS_Renderer, base);

  assign(EJS_Renderer.prototype, {
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
    }
  });

  return EJS_Renderer;
})();

module.exports = EJS_Renderer;

