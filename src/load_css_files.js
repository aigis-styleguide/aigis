import Promise from "bluebird";
import fs from "fs";
import css from "css";

export function loadCssFiles() {
  return new Promise( (resolve, reject) => {
    fs.readFile("./test.css", "utf8",  (err,file) => {
      if (err) reject(err.message);
      var ast = css.parse(file, {source: "source.css"});
      resolve(ast.stylesheet.rules);
    });
  });
}
