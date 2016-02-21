var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');
var helper = require('../../../renderer/helper');

function ejs_render(modules, options) {
  var indexPath = path.resolve(options.template);
  var template = fs.readFileSync(indexPath, 'utf-8');
//  var outputPath = path.join(options.dest, type, name, "index.html");
  var root = './';

  helper.init(options, root);

  console.log(ejs.render(template, {
    modules: modules,
    config: options,
    root: root,
    timestamp: '2016/2/21 23:30',
    helper: helper
  }, {filename: indexPath}));
}

function getRoot(outputPath) {
  var level = _.compact(outputPath
      .replace(path.normalize(this.options.dest + "/"), "")
      .replace("index.html", "")
      .split("/")
  ).length;
  var dots = "";
  if (level === 0) {
    return "./";
  }

  for(var i = 0; i < level; i++) {
    dots += "../";
  }

  return dots;
}

module.exports = ejs_render;


