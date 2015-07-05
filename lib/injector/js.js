function js(comments) {
  var reg_block = /`{3}(js|javascript)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(js|javascript|\n)+/;
  var reg_end = /`{3}/;
  
  _.each(comments, function(comment) {
    var md = comment.md.replace(reg_block, function(codeblock) {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      return codeblock + "\n\n<script>\n(function(){\n" + code + "\n})();\n</script>";
    });
    comment.md = md;
  });
}

module.exports = js;
