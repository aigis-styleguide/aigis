import through from "through2";
import jade from "jade";
/**
 * @method js
 * inject javascript from codeblock to markdown
 */
export default function jade({inject}) {
  var reg_block = /`{3}(jade)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(jade|\n)+/;
  var reg_end = /`{3}/;
  
  return through.obj(function(comment, enc, cb) {
    if (inject) {
      var md = comment.md.replace(reg_block, (codeblock) => {
        var code = codeblock.replace(reg_start, "").replace(reg_end, "");
        code = jade.compile(code)();
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
