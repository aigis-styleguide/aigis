import objectAssign from "object-assign";
import {EventEmitter2 as EventEmitter} from "eventemitter2";
import _ from "lodash";
import del from "del";
import fs from "fs";
import vfs from "vinyl-fs";
import CSON from "cson";
import path from "path";
import defaultConfig from "./defaultConfig";

export default class Config extends EventEmitter {
  constructor(opts) {
    super(opts);
    this._eventify();
    this._loadConfigCson();
  }
  _eventify() {
    this.on("end:loadconfigcson", this._onEndLoadConfigCson);
  }
  _loadConfigCson() {
    var filePath = path.resolve("./config.cson");
    var cson;
    try {
      cson = fs.readFileSync(filePath, "utf8");
    }
    catch (err) {
      // console.log(err.message);
    }
    finally {
      if (cson) {
        cson = CSON.parse(cson);
      }
      this.emit("end:loadconfigcson", cson);
    }
  }
  _onEndLoadConfigCson(json) {
    objectAssign(this, defaultConfig, json);
    this._setup();
  }
  _setup() {
    this.sourcePath = this._globWithExt("source", ".css");
  }
  _globWithExt(key, ext) {
    var paths = this[key];
    
    if (_.isArray(paths)) {
      paths = _.map(paths, function(path) {
        return path + "/**/*" + ext;
      });
    }
    else {
      paths = paths + "/**/*" + ext;
    }
    
    return paths;
  }
  
}
