var _ = require("lodash");
var marked = require("marked");
var util = require("util");

var MarkedCustomRenderer = (function(MarkedRenderer) {
  function MarkedCustomRenderer(opts) {
    MarkedRenderer.call(this, arguments);
    this.md_class = opts.md_class;
    this._defineRenderer();
    this._enableSyntaxHighlight(opts.highlight);
  }
  util.inherits(MarkedCustomRenderer, marked.Renderer);

  MarkedCustomRenderer.prototype._defineRenderer = function() {
    _.each(this.md_class, function (className, tagName) {
      this[tagName] = require("./md/" + tagName);
    }, this);
  };

  MarkedCustomRenderer.prototype._enableSyntaxHighlight = function(flag) {
    if (flag) {
      marked.setOptions({highlight: require("./highlight")});
    }
  };

  return MarkedCustomRenderer;
})(marked.Renderer);

module.exports = MarkedCustomRenderer;
