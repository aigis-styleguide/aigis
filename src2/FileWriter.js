import Base from "./Base";
import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import _ from "lodash";
import Handlebars from "handlebars";
import ConfigModel from "./ConfigModel";

export default class FileWriter extends Base{
  constructor(opt) {
    
  }
  writeFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
      if (err) return console.log(err);
    });
  }
  writeHTML(dir, html, name) {
    var filePath = path.resolve(dir);
    mkdirp(dir, (err) => {
      if (err) return console.log(err);
      this.writeFile(`${filePath}/${name}.html`, html);
    });
  }
}
