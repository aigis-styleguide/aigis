import through from "through2";

/**
 * @method html
 * inject htmlcode from codeblock to markdown
 */
export default function html(opts = {}) {
  var reg_block = /`{3}(html|block|\n)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(html|block|\n)+/;
  var reg_end = /`{3}/;
  var comments = [];
  
  return through.obj(function(comment, enc, cb) {
    if (opts.inject) {
      var md = comment.md.replace(reg_block, (codeblock) => {
        var code = codeblock.replace(reg_start, "").replace(reg_end, "");
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
