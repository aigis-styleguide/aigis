var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var htmlBeautify = require('js-beautify').html;
var colors = require('colors/safe');
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

    write: function(pages, options) {
      var destPath = path.resolve(options.dest);
      console.info(colors.bold.cyan('[Info] Output:', destPath));
      _.each(pages, function(page) {
        this.writePage(page, options);
      }, this);
    },

    writePage: function(page, options) {
      try{
        var rel = path.relative(path.resolve(options.dest, '../') ,page.outputPath);
        fs.outputFileSync(page.outputPath, page.html);
        if(options.log) {
          console.log(colors.blue('[Log]', rel));
        }
      }
      catch(e) {
        console.error(colors.bold.underline.red('[Error] Failed Output Files'));
        throw new Error(e);
      }
    }
  };

  return Writer;
})();

module.exports = new Writer();
