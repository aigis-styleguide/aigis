import through from "through2";
import objectAssign from "object-assign";
import _ from "lodash";
import CSS from "css";
import CSON from "cson";

export default function parseCSS () {
  var comments = [];
  return through.obj(function(file, enc, cb) {
    var css = CSS.parse(file.contents.toString(), {source: file.path});
    var _this = this;
    _.chain(css.stylesheet.rules)
      .filter({type: "comment"})
      .each((rule) => {
        var comment = rule.comment;
        var source = rule.position.source;
        var reg = /-{3}[\s\S]+?-{3}/;
        
        var config = CSON.parse(comment.match(reg)[0].replace(/-{3}/g, ""));
        var md = comment.replace(reg, "");
        var obj = objectAssign({},{config: config, md: md, source: source});
        this.push(obj);
        comments.push(obj);
      })
      .value();
    cb();
  }, function() {
    this.emit("end", comments);
  });
}
