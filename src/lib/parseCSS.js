import path from "path";
import through from "through2";
import objectAssign from "object-assign";
import _ from "lodash";
import CSS from "css";
import CSON from "cson";
import stylus from "stylus";
import sass from "node-sass";

export default function parseCSS () {
  var comments = [];
  return through.obj(function(file, enc, cb) {
    var css, content;
    var ext  = path.extname(file.path);
    var source = file.path;
    
    console.log(file.path);
    switch(ext.toLowerCase()) {
      case ".css":
        content = file.contents.toString();
        break;
      case ".styl":
        alt = stylus.render(file.contents.toString());
        content = alt;
        break;
      case ".scss":
      case ".sass":
        alt = sass.renderSync({
          data: file.contents.toString()
        });
        content = alt.css.toString();
        break;
    }
    css = CSS.parse(content, {source});

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
