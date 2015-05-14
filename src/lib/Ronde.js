import {EventEmitter2 as EventEmitter} from "eventemitter2";
import AssetsManager from "./AssetsManager";
import Config from "./Config";
import CommentRule from "./CommentRule";
import through from "through2";
import _ from "lodash";
import writeCategory from "./writer/category";
import writeTag from "./writer/tag";

class Ronde extends EventEmitter {
  constructor() {
    console.log("\n*** Ronde: start ***\n");
    var config = this.config = new Config();
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
    var config = this.config;
    this.commentRule.sourceStream
      .once("end", () => {
        console.log("\n*** Ronde: end ***");
      })
      .pipe(writeCategory(config))
      .pipe(writeTag(config))
      ;
  }
  _onCompleteParseCSS() {
    this.write();
  }
}

var ronde = new Ronde();

export default ronde;
