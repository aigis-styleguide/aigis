import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import _ from "lodash";
import {injectStyleSheet} from "./inject_stylesheet";
import {mdToHTML} from "./md_to_html";
import {setAssetsPath} from "./set_assets_path";
import Handlebars from "handlebars";

export function writeCategolizedHTML(categorizedComment, config) {  
  var dist = path.resolve(config.path.dist);
  
  _.each(categorizedComment, (comments, categoryName, self) => {
    categorizedComment[categoryName].html = _.map(comments, (comment) => {
      comment.html = mdToHTML(comment);
      // comment.html = injectStyleSheet(comment, config);
      // return mdToHTML(comment);
      return comment.html;
    }).join('\n');
  });
  
  setAssetsPath(categorizedComment);
  
  _.each(categorizedComment, (comments, categoryName) => {
    mkdirp(dist, (err) => {
      if (err) console.log(err);
      mkdirp(`${dist}/category`, (err) => {
        if (err) console.log(err);
        var baseTempaltePath = path.resolve("./src/template/base.hbs");
        
        fs.readFile(baseTempaltePath, (err, hbs) => {
          hbs = hbs.toString();
          
          var template = Handlebars.compile(hbs);
          var html = template({
              body: comments.html,
              js: comments.assets.js,
              css: comments.assets.css
            });
          fs.writeFile(`${dist}/category/${categoryName}.html`, html, (err) => {
            if (err) console.log(err);
          });
        });
        // fs.writeFile(`${dist}/category/${categoryName}.html`, comments.html, (err) => {
        //   if (err) console.log(err);
        // });
      });
    });
  });
}
