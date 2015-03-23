import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import _ from "lodash";

export function copyCSS(categorizedComment, config) {
  var dist = path.resolve(config.path.dist);
  var cssdir = path.resolve(config.path.css);
  
  mkdirp(`${dist}/assets/css`, (err) => {
    _.each(_.keys(categorizedComment), (categoryName) => {
      _.each(categorizedComment[categoryName].css, (filePath) => {
        var fileName = path.basename(filePath);
        fs.createReadStream(filePath)
        .pipe(fs.createWriteStream(`${dist}/assets/css/${fileName}`));
      });
    });
  });
}
