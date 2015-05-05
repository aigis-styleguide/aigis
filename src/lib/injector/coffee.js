import through from "through2";
// import {register as coffee} from "coffee-script";
import coffee from "coffee-script";

/**
 * @method js
 * inject javascript from codeblock to markdown
 */
export default function coffee({inject}) {
  var reg_block = /`{3}(coffee)+[\s\S]*?`{3}/;
  var reg_start = /`{3}(coffee|\n)+/;
  var reg_end = /`{3}/;
  var comments = [];
  
  return through.obj(function(comment, enc, cb) {
    if (inject) {
      var md = comment.md.replace(reg_block, (codeblock) => {
        var code = codeblock.replace(reg_start, "").replace(reg_end, "");
        code = coffee.compile(code);
        return `${codeblock}\n\n<script>\n${code}\n</script>`;
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
