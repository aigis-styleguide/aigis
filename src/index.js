import _ from "lodash";
import marked from "marked";
import vhs from "vinyl-fs";
import through from "through2";

import AssetsManager from "./lib/AssetsManager";
import Config from "./lib/Config";
import CommentRule from "./lib/CommentRule";
import MarkedCustomRenderer from "./lib/MarkedCustomRenderer";

var config = new Config();

var assetsManager = new AssetsManager(config);
// assetsManager.init();

var renderer = new MarkedCustomRenderer(config);

function log (opt) {
  return through.obj(function(obj, enc, cb) {
    console.log(obj);
    this.push(obj);
    cb();
  });
}

var commentRule = new CommentRule(config);
commentRule.loadCSS();

commentRule.on("complete:loadcss", function () {
  var md = commentRule.comments[1].md;
  console.log(marked(md,{renderer:renderer}));
  // marked(md,{renderer:renderer})
  // vfs.src(commentRule.comments)
  //   pipe(log)
});
