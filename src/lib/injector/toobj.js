import through from "through2";

export default function toobj() {
  var comments = [];
  
  return through.obj(function(comment, enc, cb) {
    this.push(comment);
    comments.push(comment);
    cb();
  }, function(cb) {
    this.emit("endtoobj", comments);
    cb();
  });
}
