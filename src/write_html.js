import fs from "fs";
import {injectStyleSheet} from "./inject_stylesheet";
export function writeHTML(comment) {
  var yaml = comment.yaml;
  var html = comment.html;
  html = injectStyleSheet(html);
  fs.writeFile(yaml.title + '.html', html, function(err) {
    if (err) console.log(err);
  });
}
