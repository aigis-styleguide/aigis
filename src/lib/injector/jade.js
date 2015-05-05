import through from "through2";
import jade from "jade";
/**
 * @method js
 * inject javascript from codeblock to markdown
 */
export default function jade(opts = {}) {
  var reg_block = /`{3}(jade)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(jade|\n)+/;
  var reg_end = /`{3}/;
  var comments = [];
  
  return through.obj(function(comment, enc, cb) {
    if (opts.inject) {
      var md = comment.md.replace(reg_block, (codeblock) => {
        var code = codeblock.replace(reg_start, "").replace(reg_end, "");
        code = jade.compile(code)();
        return `${code}\n\n${codeblock}`;
      });
      comment.md = md;
    }
    this.push(comment);
    comments.push(comment);
    cb();
  }, function() {
    this.emit("end", comments);
  });
}
