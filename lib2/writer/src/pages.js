var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var htmlBeautify = require('js-beautify').html;
var BEUTIFY_OPTIONS = {
  max_preserve_newlines: 1,
  indent_size: 2,
  end_with_newline: true,
  indent_inner_html: true,
  extra_liners: []
};

var Writer = (function() {
  function Writer() {
  }

  Writer.prototype = {
    constructor: Writer,

    write: function(pages) {
      _.each(pages, function(page) {
        this.writePage(page);
      }, this);
    },

    writePage: function(page) {
      fs.outputFileSync(page.outputPath, page.html);
    }
  };

  return Writer;
})();

module.exports = Writer;
