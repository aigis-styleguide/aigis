var hbs = require('handlebars');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var assign = require('object-assign');
var util = require('util');
var base = require('./base');

var HBS_Renderer = (function () {
  function HBS_Renderer(components, options) {
    this.options = options;
    this.components = components;
    this.initialize();
  }
  
  util.inherits(HBS_Renderer, base);
  
  assign(HBS_Renderer.prototype, {
    initialize: function () {
      base.prototype.initialize.call(this);
      var _this = this;
      hbs.registerHelper('include', function (includePath, options) {
        var template = _this._loadTemplate(includePath);
        return new hbs.SafeString(template(this));
      });
      
      hbs.registerHelper('renderCollectionTree', function (type, options) {
        _this.helper.setProperty({
          collection: _this.options.collection,
          root: options.data.root.root
        });
        
        var keyName = options.hash.key;
        
        if(keyName) {
          return _this.helper.renderCollectionTree(type)[keyName]
        } else {
          return _this.helper.renderCollectionTree(type);
        }
        
      });
    },
    _loadTemplate: function (fileName) {
      var ext = this.options.template_ext[this.options.template_engine];
      var filePath = path.join(this.options.template_dir, fileName + ext)
      try {
        var template = fs.readFileSync(filePath, 'utf-8');
        return hbs.compile(template);
      }
      catch (e) {
        throw new Error(e);
      }
    }
  });
  
  return HBS_Renderer;
})();

module.exports = HBS_Renderer;
