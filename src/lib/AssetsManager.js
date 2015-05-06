import through from "through2";
import {EventEmitter2 as EventEmitter} from "eventemitter2";
import _ from "lodash";
import del from "del";
import vfs from "vinyl-fs";
import fse from "fs-extra";
import path from "path";

/**
 * @class AssetsManager
 * @param {object} opts
 * 
 * provide delete and copy doc_assets to dest
 * doing before generate documents
 */
export default class AssetsManager extends EventEmitter {
  constructor({config}) {
    super();
    this.config = config;
    this._eventify();
    this.init();
  }
  init() {
    this.copyAssets();
  }
  _eventify() {
    this.on("end:deletedest", this._onEndDeleteAll);
  }
  /**
   * @method copyAssets
   */
  copyAssets() {
    this._deleteDest();
  }
  /**
   * @method _deleteDest
   * delete dest folder
   */
  _deleteDest() {
    del(this.config.dest, () => {
      this.emit("end:deletedest");
    });
  }
  /**
   * @method _copyAllAssetsToDest
   * copy doc_assets from config.dependencies to config.dest
   */
  _copyAllAssetsToDest() {
    var config = this.config;
    var _dependencies = [];
    
    if (_.isArray(config.dependencies) && config.dependencies.length !== -1) {
      _dependencies = _.map(config.dependencies, (folder) => {
        return folder + "";
      });
    }
    else {
      if (config.dependencies && config.dependencies.length !== -1) {
        _dependencies.push(config.dependencies);
      }
    }
    
    _dependencies.forEach((_path) =>{
      var folderName = path.basename(_path);
      var folderPath = `${config.dest}/${folderName}`;
      fse.emptyDirSync(folderPath);
      fse.copySync(_path, folderPath);
    });
    this.emit("complete");
  }
  _copyRondeAssets() {
    vfs.src("./ronde_assets/**/*")
      .pipe(vfs.dest(this.config.dest + "/ronde_assets"));
  }
  _onEndDeleteAll() {
    this._copyAllAssetsToDest();
    this._copyRondeAssets()
  }
}
