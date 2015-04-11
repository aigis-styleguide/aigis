import through from "through2";

/**
 * @method js
 * inject javascript from codeblock to markdown
 */
export default function js(opts) {
  var reg_block = /`{3}(js|javascript)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(js|javascript|\n)+/;
  var reg_end = /`{3}/;
  
  return through.obj(function(comment, enc, cb) {
    var md = comment.md.replace(reg_block, (codeblock) => {
      var code = codeblock.replace(reg_start, "").replace(reg_end, "");
      return `${codeblock}\n\n<script>\n(function(){\n${code}\n})();\n</script>`;
    });
    comment.md = md;

    this.push(comment);
    cb();
  });
}
