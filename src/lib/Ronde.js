import {EventEmitter2 as EventEmitter} from "eventemitter2";
import AssetsManager from "./AssetsManager";
import Config from "./Config";
import CommentRule from "./CommentRule";
import MarkedCustomRenderer from "./MarkedCustomRenderer";
import marked from "marked";

export default class Ronde extends EventEmitter {
  constructor() {
    var config = this.config = new Config();
    this.assetsManager = new AssetsManager({config});
    this.renderer = new MarkedCustomRenderer({config});
    this.commentRule = new CommentRule({config});
    this._eventify();
    this.commentRule.loadCSS();
  }
  _eventify() {
    this.commentRule.on("complete:loadcss", this._onCompleteLoadCSS.bind(this));
  }
  _onCompleteLoadCSS() {
    var renderer = this.renderer;
    // console.log(this.commentRule.comments);
    var md = this.commentRule.comments[1].md;
    console.log(marked(md,{renderer}));
  }
}
