import through from "through2";
import _ from "lodash";
import fs from "fs-extra";
import Handlebars from "Handlebars";

export default function module(config) {
  var tmpl = Handlebars.compile(fs.readFileSync(`${config.layout_template}/module.hbs`, "utf8"));
  
  return through.obj(function(comment, enc, cb) {
    var config = comment.config;
    comment.html = tmpl({
      html: comment.html,
      tag: _.sortBy(config.tag),
      name: config.name,
      path: config._filePath,
      config
    });
    
    this.push(comment);
    cb();
  }, function(cb) {
    cb();
  });
}
