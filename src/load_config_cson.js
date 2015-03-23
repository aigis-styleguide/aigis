import Promise from "bluebird";
import fs from "fs";
import CSON from "cson";
import path from "path";

export function loadConfigCSON (){
  return new Promise( (resolve, reject) => {
    var configPath = path.resolve("./config.cson");
    fs.readFile(configPath, "utf8", (err, file) =>{
      if (err) reject(err.message);
      var config = CSON.parse(file);
      resolve(config);
    });
  });
}
