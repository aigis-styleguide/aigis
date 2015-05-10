import marked from "marked";
import through from "through2";

export default function markdownToHTML(renderer) {
  return through.obj(function(comment, enc, cb) {
    comment.html = marked(comment.md, {renderer});
    console.log(comment.config.title);
    this.push(comment);
    cb();
  }, function(cb) {
    cb();
  });
}
