import through from "through2";

export default function log () {
  console.log("------------- log -------------\n");
  return through.obj(function(obj, enc, cb) {
    console.log(obj);
    console.log("\n------------- log -------------\n");
    this.push(obj);
    cb();
  }, function(cb) {
    cb();
  });
}
