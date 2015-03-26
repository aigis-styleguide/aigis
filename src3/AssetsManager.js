import through from "through2";
import objectAssign from "object-assign";
import {EventEmitter2 as EventEmitter} from "eventemitter2";
import _ from "lodash";
import del from "del";
import vfs from "vinyl-fs";

/*
  @class AssetsManager
  @param {opts} 
  
  provide delete and copy doc_assets to dest
  doing before generate documents
*/
export default class AssetsManager extends EventEmitter {
  constructor(opts) {
    super(opts);
    this.config = opts;
    this._eventify();
  }
  _eventify() {
    this.on("end:deleteall", this._onEndDeleteAll);
  }
  copyAssets() {
    this._deleteAll();
  }
  _deleteAll() {
    del(this.config.dest, () => {
      this.emit("end:deleteall");
    });
  }
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
  _onEndDeleteAll() {
    this._copyAllAssetsToDest();
  }
}
