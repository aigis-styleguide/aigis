var marked = require("marked");
var util = require("util");

var MarkedCustomRenderer = (function(Parent) {
  function MarkedCustomRenderer(opts) {
    Parent.call(this, arguments);
    this.md_class = opts.md_class;
    this._defineRenderer();
  }
  util.inherits(MarkedCustomRenderer, marked.Renderer);
  MarkedCustomRenderer.prototype._defineRenderer = function() {
    _.each(this.md_class, function (className, tagName) {
      var renderer = require("./md/" + tagName);
      this[tagName] = renderer;
    }, this);
    
  };
  MarkedCustomRenderer.prototype._renderer = function(type, args) {
      
  };
  
  return MarkedCustomRenderer;
})(marked.Renderer);

module.exports = MarkedCustomRenderer;
