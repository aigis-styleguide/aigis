import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import _ from "lodash";
import {injectStyleSheet} from "./inject_stylesheet";
import {mdToHTML} from "./md_to_html";
import {setAssetsPath} from "./set_assets_path";
import Handlebars from "handlebars";
import {copyCSS} from "./copy_css";

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
  
  copyCSS(categorizedComment, config);
  setAssetsPath(categorizedComment);
  // console.log(categorizedComment.test);
  
  _.each(categorizedComment, (comments, categoryName) => {
    if (_.isEmpty(comments.html)) return;
    mkdirp(dist, (err) => {
      if (err) console.log(err);
      mkdirp(`${dist}/category`, (err) => {
        if (err) console.log(err);
        var baseTempaltePath = path.resolve("./src/template/base.hbs");
        
        fs.readFile(baseTempaltePath, (err, hbs) => {
          hbs = hbs.toString();
          var css = _.map(comments.css, (filePath) => {
            var fileName = path.basename(filePath);
            return `../assets/css/${fileName}`;
          });
          
          var template = Handlebars.compile(hbs);
          var html = template({
              body: comments.html,
              assets_js: comments.assets.js,
              assets_css: comments.assets.css,
              css: css
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
