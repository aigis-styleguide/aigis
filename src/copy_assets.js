import fs from "fs";
import mkdirp from "mkdirp";
import find from "findit";
import path from "path";
import _ from "lodash";

export function copyAssets(config) {
  var dist = path.resolve(config.path.dist);
  var cssdir = path.resolve(config.path.css);
  
  _.each(_.keys(config.assets), (key) => {
    mkdirp(`${dist}/assets/${key}/lib`, () => {
      _.each(config.assets[key], (assets) => {
        _.forIn(assets, (basePath, name) => {
          var filePath = path.resolve(basePath);
          var fileName = path.basename(basePath);
          fs.createReadStream(filePath)
          .pipe(fs.createWriteStream(`${dist}/assets/${key}/lib/${fileName}`));
        });
      });
    });
  });
  
  function getFileList(dirname, extname) {
    return new Promise(function(resolve, reject) {
      var dir = path.resolve(dirname);
      var finder = find(dir);
      var fileList = [];
      
      finder.on("file", (file) => {
        if (path.extname(file) !== extname) return;
        fileList.push(file);
      });
      
      finder.on("end", () => {
        resolve(fileList);
      });
    });
  }
}
