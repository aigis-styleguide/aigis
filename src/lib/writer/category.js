import through from "through2";
import fs from "fs-extra";
import Handlebars from "handlebars";
import _ from "lodash";
import Render from "../layout/Render";

export default function categoryWriter(config) {
  var categorized = {};
  var dist = config.dest;
  
  return through.obj(function(comment, enc, cb) {
    _.each(comment.config.category, (categoryName) => {
      categorized[categoryName] = categorized[categoryName] || [];
      categorized[categoryName].push(comment);
    });
    
    this.push(comment);
    cb();
  }, function(cb) {
    var render = new Render(config);
    var categorizedHtml = _.map(categorized, (comments, name) => {
      var contents = _.map(comments, (comment) => comment.html);
      var html = contents.join("\n");
      return {name, html, contents};
    });
    
    var category = _.map(categorized, (val, name) => {
      return {name, href: `./${name}.html`};
    });
    
    _.each(categorizedHtml, (_category) => {
      var _html = render.build({
        header: {name: _category.name},
        footer: {},
        sidemenu: {category},
        contents: _category.contents,
        name: _category.name,
      });
    
      var contents = new Buffer(_html);
      var writePath = `${dist}/${_category.name}.html`;
      fs.writeFile(writePath, contents);
    });
    
    cb();
  });
}
