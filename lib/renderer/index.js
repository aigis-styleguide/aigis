var MarkedCustomRenderer = require("./markdown");
var marked = require("marked");
var fs = require("fs-extra");

function renderIndex(options) {
  var md = fs.readFileSync(options.index, "utf8");
  var renderer = new MarkedCustomRenderer(options);
  return marked(md, {renderer: renderer});
}

module.exports = renderIndex;
