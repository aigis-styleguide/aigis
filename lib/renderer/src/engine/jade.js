var jade = require('jade');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var assign = require('object-assign');
var util = require('util');
var base = require('./base');

var JADE_Renderer = (function() {
  function JADE_Renderer(components, options) {
    this.options = options;
    this.components = components;
    this.initialize();
  }

  util.inherits(JADE_Renderer, base);

  assign(JADE_Renderer.prototype, {
    _loadTemplate: function(fileName) {
      var ext = this.options.template_ext[this.options.template_engine];
      var filePath = path.join(this.options.template_dir, fileName + ext);
      try {
        var template = fs.readFileSync(filePath, 'utf-8');
        return jade.compile(template, {filename: filePath, pretty: true});
      }
      catch(e) {
        throw new Error(e);
      }
    }
  });

  return JADE_Renderer;
})();

module.exports = JADE_Renderer;

