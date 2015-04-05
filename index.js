var _ = require("lodash");
var marked = require("marked");
var vfs = require("vinyl-fs");
var through = require('through2');


var AssetsManager = require("./dist3/AssetsManager");
var Config = require("./dist3/Config");
var CommentRule = require("./dist3/CommentRule");

var config = new Config();

var assetsManager = new AssetsManager(config);
// assetsManager.init();
var MarkedCustomRenderer = require("./dist3/MarkedCustomRenderer");

var renderer = new MarkedCustomRenderer(config);

function log (opt) {
  return through.obj(function(obj, enc, cb) {
    console.log(obj);
    this.push(obj);
    cb();
  });
}

var commentRule = new CommentRule();
commentRule.loadCSS(config);

commentRule.on("complete:loadcss", function () {
  var md = commentRule.comments[1].md;
  console.log(marked(md,{renderer:renderer}));
  // marked(md,{renderer:renderer})
  // vfs.src(commentRule.comments)
  //   pipe(log)
});
