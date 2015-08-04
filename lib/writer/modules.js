var fs = require("fs-extra");
var htmlBeautify = require("js-beautify").html;
var DEFAULT_OPTIONS = {
  max_preserve_newlines: 1,
  indent_size: 2,
  end_with_newline: true,
  indent_inner_html: true,
  extra_liners: []
};

/*
* {Object} options
* {String} options.outputPath
* {String} options.html
* {Boolean} options.beautify
* {Object} options.beautifyOptions
*/
function writeModules(options) {
  var html = options.html;
  var outputPath = options.outputPath;
  options.beautifyOptions = options.beautifyOptions || {};
  var beautifyOptions = _.extend(DEFAULT_OPTIONS, options.beautifyOptions);

  if (options.beautify !== false) {
    html = htmlBeautify(html, beautifyOptions);
  }
  fs.outputFileSync(outputPath, html);
}

module.exports = writeModules;
