import {EventEmitter2 as EventEmitter} from "eventemitter2";
import through from "through2";
import objectAssign from "object-assign";
import _ from "lodash";
import vfs from "vinyl-fs";
import CSS from "css";
import CSON from "cson";

export default class CommentRule extends EventEmitter {
  constructor(opts) {
    super(opts);
    this.config = opts;
    this._eventify();
  }
  _eventify() {
    this.on("end:loadcss", this._onEndParseCSS);
  }
  loadCSS() {
    var config = this.config;
    var source = config.globWithExt("source", ".css");
    this.sourceStream = vfs.src(source)
      .pipe(this.parse())
      .on("end", (comments) => {
        this.emit("end:loadcss", comments);
      });
  }
  parse() {
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
  _onEndParseCSS(comments) {
    this.comments = comments;
    this.emit("complete:loadcss");
  }
  log (opt) {
    return through.obj(function(obj, enc, cb) {
      console.log(obj);
      this.push(obj);
      cb();
    });
  }
}
