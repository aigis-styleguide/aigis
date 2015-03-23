import Promise from "bluebird";
import fs from "fs";
import find from "findit";
import path from "path";
import css from "css";
import _ from "lodash";

export function loadCssFiles(config) {
  return new Promise( (resolve, reject) => {
    var dir = path.resolve(config.path.css);
    var finder = find(dir);
    var fileList = [];
    
    finder.on("file", (file, stat) => {
      if(path.extname(file) !== ".css") return;
      fileList.push(readFile(file));
    });
    
    finder.on("end", () => {
      Promise.all(fileList)
      .then((x) => {
        resolve(x);
      });
    });
  });
  function readFile(source) {
    return new Promise((resolve, reject) => {
        fs.readFile(source, "utf8", (err, file) => {
          var ast = css.parse(file, {source});
          resolve(ast.stylesheet.rules);
        });
    });
  }
}
