var _ = require('lodash');

var AigisTemplateHelper = (function() {
  function AigisTemplateHelper(options) {
    this.options = options;
    this.root = './';
    this.category = [];
    this.outputPath = 'index.html';
  }

  AigisTemplateHelper.prototype = {
    constructor: AigisTemplateHelper,

    setProperty: function(params) {
      _.each(params, function(value, key) {
        this[key] = value;
      }.bind(this));
    },

    renderCategoryTree: function() {
      var parseTree = require('./helper/parse_tree');
      var renderTree = require('./helper/render_tree');
      var tree = parseTree(this.collection.category);
      var html = renderTree(tree, 0, this.root, this.outputPath);
      return html;
    }
  };

  return AigisTemplateHelper;
})();

module.exports = function(options) {
  return new AigisTemplateHelper(options);
};
