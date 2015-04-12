import {EventEmitter2 as EventEmitter} from "eventemitter2";
import AssetsManager from "./AssetsManager";
import Config from "./Config";
import CommentRule from "./CommentRule";
import MarkedCustomRenderer from "./MarkedCustomRenderer";
import stream from "obj-stream";
import File from "vinyl";
import vfs from "vinyl-fs";
import log from "./logStream";
import through from "through2";
import fs from "graceful-fs";
import markdownToHTML from "./markdownToHTML";

class Ronde extends EventEmitter {
  constructor() {
    var config = this.config = new Config();
    this.renderer = new MarkedCustomRenderer({config});
    this.assetsManager = new AssetsManager({config});
    this.commentRule = new CommentRule({config});
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
    // var file = new File({
    //   cwd: "/local/work/Ronde/",
    //   base: "/local/work/Ronde/ronde",
    //   path: "/local/work/Ronde/ronde/file.html",
    //   contents: new Buffer(md)
    // });
    // console.log(file);
    // file.pipe(log())
    //   .pipe(vfs.dest());
    // vfs.dest(file);
    // console.log(marked(md,{renderer}));
  }
  writer() {
    var config = this.config;
    var dist = config.dest;
    return through.obj(function(comment, enc, cb) {
      var contents = new Buffer(comment.html);
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
