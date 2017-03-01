var _ = require('lodash');

var DEFAULT_HELPER_OPTIONS = {
  disable_link_index: false
};

var AigisTemplateHelper = (function() {
  function AigisTemplateHelper(options) {
    this.options = options;
    this.root = './';
    this.outputPath = 'index.html';
    if (this.options.helper_options) {
      this.helperOptions = _.extend({}, DEFAULT_HELPER_OPTIONS, this.options.helper_options);
    }
    else {
      this.helperOptions = DEFAULT_HELPER_OPTIONS;
    }
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
      
      return renderTree(type, tree, 0, this.root, this.outputPath, this.helperOptions.disable_link_index, this.helperOptions.renderTemplateJSON);
    }
  };

  return AigisTemplateHelper;
})();

module.exports = function(options) {
  return new AigisTemplateHelper(options);
};
