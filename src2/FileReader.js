import Base from "./Base";
import Promise from "bluebird";
import fs from "fs";
import path from "path";
import _ from "lodash";
import find from "findit";

export default class FileReader extends Base{
  constructor(opt) {
    super();
  }
  readFile(filePath) {
    var _path = path.resolve(filePath);
    fs.readFile(_path, "utf8", (err, file) => {
      if (err) this.emit("error", err);
      this.emit("fetch", file);
    });
  }
  readFileSync(filePath) {
    var _path = path.resolve(filePath);
    return fs.readFileSync(_path, "utf8");
  }
  findBySource(paths, ext) {
    if(_.isArray(paths)) {
      return this.findFilesFromArray(paths, ext);
    }
    else {
      return this.findFiles(paths, ext);
    }
  }
  findFiles(dirPath, ext) {
    return new Promise((resolve, reject) => {
      var dir = path.resolve(dirPath);
      var finder = find(dir);
      var fileList = [];
      
      finder.on("file", (file, stat) => {
        if(path.extname(file) !== ext) return;
        fileList.push(file);
      });
      
      finder.on("end", () => {
        resolve(fileList);
      });
    });
  }
  findFilesFromArray(pathsArray, ext) {
    return Promise.all(
      _.map(pathsArray, (dirPath) => {
        return this.findFiles(dirPath, ext);
      })
    );
  }
  
}
