import Promise from "bluebird";
import fs from "fs";
import CSON from "cson";

export function loadConfigCSON (){
  return new Promise( (resolve, reject)=> {
    fs.readFile("./config.cson", "utf8", (err, file) =>{
      if (err) reject(err.message);
      var config = CSON.parse(file);
      resolve(config);
    });
  });
}
