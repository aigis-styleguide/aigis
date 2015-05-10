import {EventEmitter2 as EventEmitter} from "eventemitter2";
import AssetsManager from "./AssetsManager";
import Config from "./Config";
import CommentRule from "./CommentRule";
import MarkedCustomRenderer from "./MarkedCustomRenderer";
import vfs from "vinyl-fs";
import log from "./logStream";
import through from "through2";
import fs from "graceful-fs";
import markdownToHTML from "./markdownToHTML";
import Handlebars from "handlebars";
import HbsUtil from "./HandlebarsUtil";

class Ronde extends EventEmitter {
  constructor() {
    var config = this.config = new Config();
    this.renderer = new MarkedCustomRenderer({config});
    this.assetsManager = new AssetsManager({config});
    this.commentRule = new CommentRule({config});
    this.hbsUtil = new HbsUtil({config});
    this._eventify();
    this.commentRule.loadCSS();
  }
  _eventify() {
    this.commentRule.on("complete:loadcss", this._onCompleteLoadCSS.bind(this));
  }
  _onCompleteLoadCSS() {
    var renderer = this.renderer;
    this.commentRule.sourceStream
      .pipe(markdownToHTML(renderer))
      .pipe(this.writer())
      ;
  }
  writer() {
    var config = this.config;
    var dist = config.dest;
    var _this = this;
    return through.obj(function(comment, enc, cb) {
      var html = Handlebars.compile(fs.readFileSync("./layout/base.hbs", "utf8"))({
        body: comment.html
      });
      
      var contents = new Buffer(html);
      var writePath = `${dist}/${comment.config.title}.html`;
      fs.writeFile(writePath, contents);
      this.push(comment);
      cb();
    }, function() {
      this.emit("end");
    });
  }
}

var ronde = new Ronde();

export default ronde;
