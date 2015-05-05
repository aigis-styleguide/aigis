import through from "through2";
import {EventEmitter2 as EventEmitter} from "eventemitter2";
import _ from "lodash";
import del from "del";
import vfs from "vinyl-fs";

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
   * copy doc_assets from config.doc_assets to config.dest
   */
  _copyAllAssetsToDest() {
    var _doc_assets = [];
    if (_.isArray(this.config.doc_assets)) {
      _doc_assets = _.map(this.config.doc_assets, (folder) => {
        return folder + "/**/*";
      });
    }
    else {
      _doc_assets = this.config.doc_assets + "/**/*";
    }
    vfs.src(_doc_assets)
      .pipe(vfs.dest(this.config.dest + "/doc_assets"))
      .on("end", () => {
        this.emit("complete");
      });
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
