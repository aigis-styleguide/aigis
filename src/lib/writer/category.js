import through from "through2";
import fs from "graceful-fs";
import Handlebars from "handlebars";
import _ from "lodash";

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
    var categorizedHtml = _.map(categorized, (comments, name) => {
      var html = _.map(comments, (comment) => comment.html).join("\n");
      return {name, html};
    });
    var tmpl = Handlebars.compile(fs.readFileSync("./layout/base.hbs", "utf8"));
    _.each(categorizedHtml, (category) => {
      var html = tmpl({
        body: category.html,
        name: category.name
      });
      var contents = new Buffer(html);
      var writePath = `${dist}/${category.name}.html`;
      fs.writeFile(writePath, contents);
    });
    
    cb();
  });
}
