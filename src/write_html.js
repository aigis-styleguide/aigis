import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import {injectStyleSheet} from "./inject_stylesheet";

export function writeHTML(comment, config) {
  var yaml = comment.yaml;
  var html = comment.html;
  html = injectStyleSheet(html);
  var dist = path.resolve(config.path.dist);
  
  mkdirp(dist, (err) => {
    if (err) return;
    fs.writeFile(`${dist}/${yaml.title}.html`, html, function(err) {
      if (err) console.log(err);
    });
  });
  
}
