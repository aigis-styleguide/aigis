var _ = require('lodash');
var htmlBeautify = require('js-beautify').html;

function html(comments) {
  var reg_block = /`{3}(html|block)+[\s\S]*?`{3}/g;
  var reg_start = /`{3}(html|block|\n)+/;
  var reg_end = /`{3}/;

  var tansformedComments = _.map(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, '').replace(reg_end, '');
      // remove preserve newlines for markdown parser
      code = htmlBeautify(code, {
        preserve_newlines: false
      });
      return '<div class="aigis-preview">\n  ' + code + '</div>\n\n' + codeblock;
    });
    comment.md = md;
  });
  return transferEncodingExpression;
}

module.exports = html;
