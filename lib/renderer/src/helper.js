var _ = require('lodash');

var AigisTemplateHelper = (function() {
  function AigisTemplateHelper(options) {
    this.options = options;
    this.root = './';
    this.outputPath = 'index.html';
  }

  AigisTemplateHelper.prototype = {
    constructor: AigisTemplateHelper,

    setProperty: function(params) {
      _.each(params, function(value, key) {
        this[key] = value;
      }.bind(this));
    },

    renderCollectionTree: function(type) {
      var parseTree = require('./helper/parse_tree');
      var renderTree = require('./helper/render_tree');
      var tree = parseTree(this.collection[type]);
      var html = renderTree(type, tree, 0, this.root, this.outputPath, this.options.disable_index);
      return html;
    }
  };

  return AigisTemplateHelper;
})();

module.exports = function(options) {
  return new AigisTemplateHelper(options);
};
