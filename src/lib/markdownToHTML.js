import marked from "marked";
import through from "through2";

export default function markdownToHTML(renderer) {
  
  return through.obj(function(comment, enc, cb) {
    // console.log(comment.config.title);
    comment.html = marked(comment.md, {renderer});
    this.push(comment);
    cb();
  }, function(cb) {
    cb();
  });
}
