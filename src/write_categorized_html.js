import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import _ from "lodash";
import {injectStyleSheet} from "./inject_stylesheet";
import {mdToHTML} from "./md_to_html";

export function writeCategolizedHTML(categorizedComment, config) {  
  var dist = path.resolve(config.path.dist);
  
  _.each(categorizedComment, (comments, categoryName, self) => {
    categorizedComment[categoryName].html = _.map(comments, (comment) => {
      comment.html = mdToHTML(comment);
      comment.html = injectStyleSheet(comment, config);
      // return mdToHTML(comment);
      return comment.html;
    }).join('');
  });
  
  _.each(categorizedComment, (comments, categoryName) => {
    mkdirp(dist, (err) => {
      if (err) console.log(err);
      mkdirp(`${dist}/category`, (err) => {
        if (err) console.log(err);
        fs.writeFile(`${dist}/category/${categoryName}.html`, comments.html, (err) => {
          if (err) console.log(err);
        });
      });
    });
  });
}
