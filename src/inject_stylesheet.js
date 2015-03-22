import path from "path";
import _ from "lodash";

export function injectStyleSheet(comment, config) {
  var dist = path.resolve(config.path.dist);
  var html = comment.html;
  var libs = comment.yaml.libs;
  _.each(libs, (name) => {
    var ext = path.extname(name);
    if (ext === ".js") {
      html = `<script src="../assets/js/lib/${name}"></script>\n${html}`;
    }
    if (ext === ".css") {
      html = `<link rel="stylesheet" href="../assets/css/lib/${name}">\n${html}`;
    }
  });
  
  return html;
}
