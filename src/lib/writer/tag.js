import through from "through2";
import fs from "fs-extra";
import Handlebars from "handlebars";
import _ from "lodash";
import Render from "../layout/Render";

export default function tagWriter(config) {
  var tagged = {};
  var dist = config.dest;
  
  return through.obj(function(comment, enc, cb) {
    _.each(comment.config.tag, (tagName) => {
      tagged[tagName] = tagged[tagName] || [];
      tagged[tagName].push(comment);
    });
    
    this.push(comment);
    cb();
  }, function(cb) {
    var render = new Render(config);
    var taggedHtml = _.map(tagged, (comments, name) => {
      var contents = _.map(comments, (comment) => comment.html);
      var moduleList = _.map(comments, (comment) => comment.config.name);
      var html = contents.join("\n");
      return {name, html, contents, moduleList};
    });
    
    var category = _.map(config.categoryList, (name) => {
      return {name, href: `../${name}.html`};
    });

    var tag = _.map(config.tagList, (name) => {
      return {name, href: `./${name}.html`};
    });
    
    _.each(taggedHtml, (_tag) => {
      var _html = render.build({
        header: {name: _tag.name, path: ".."},
        footer: {path: ".."},
        sidemenu: {category, tag},
        contents: _tag.contents,
        module: {list: _tag.moduleList, contents: _tag.contents},
        name: _tag.name,
      });
    
      var contents = new Buffer(_html);
      var writePath = `${dist}/tag/${_tag.name}.html`;
      fs.outputFile(writePath, contents);
    });
    
    cb();
  });
}
