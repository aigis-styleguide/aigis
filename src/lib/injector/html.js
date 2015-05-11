import through from "through2";

/**
 * @method html
 * inject htmlcode from codeblock to markdown
 */
export default function html({inject}) {
  var reg_block = /`{3}(html|block|\n)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(html|block|\n)+/;
  var reg_end = /`{3}/;
  
  return through.obj(function(comment, enc, cb) {
    if (inject) {
      var md = comment.md.replace(reg_block, (codeblock) => {
        var code = codeblock.replace(reg_start, "").replace(reg_end, "");
        return `<div class="ronde-preview">${code}</div>\n\n${codeblock}`;
      });
      comment.md = md;
    }
    
    this.push(comment);    
    cb();
  }, function(cb) {
    cb();
  });
}
