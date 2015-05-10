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
import _ from "lodash";
import categoryWriter from "./writer/category";

class Ronde extends EventEmitter {
  constructor() {
    var config = this.config = new Config();
    this.renderer = new MarkedCustomRenderer({config});
    this.assetsManager = new AssetsManager({config});
    this.commentRule = new CommentRule({config});
    this._eventify();
    this.commentRule.parse();
  }
  _eventify() {
    this.commentRule.once("complete:parsecss", this._onCompleteParseCSS.bind(this));
  }
  write() {
    var renderer = this.renderer;
    this.commentRule.sourceStream
      .pipe(markdownToHTML(renderer))
      .pipe(categoryWriter(this.config))
      ;
  }
  _onCompleteParseCSS() {
    this.write();
  }
}

var ronde = new Ronde();

export default ronde;
