import {EventEmitter2 as EventEmitter} from "eventemitter2";
import through from "through2";
import objectAssign from "object-assign";
import _ from "lodash";
import vfs from "vinyl-fs";
import CSS from "css";
import CSON from "cson";
import parseCSS from "./parseCSS";
import log from "./logStream";

export default class CommentRule extends EventEmitter {
  constructor({config}) {
    super();
    this.config = config;
    this._eventify();
  }
  _eventify() {
    this.on("end:loadcss", this._onEndParseCSS);
  }
  loadCSS() {
    var config = this.config;
    var source = config.sourcePath;
    this.sourceStream = vfs.src(source)
      .pipe(parseCSS())
      .on("end", (comments) => {
        this.emit("end:loadcss", comments);
      });
  }
  _onEndParseCSS(comments) {
    this.comments = comments;
    this.emit("complete:loadcss");
  }
}
