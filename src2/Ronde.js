import Promise from "bluebird";
import Base from "./Base";
import ConfigModel from "./ConfigModel";
import FileReader from "./FileReader";
import RuleCollection from "./RuleCollection";
import _ from "lodash";

export default class Ronde extends Base {
  constructor(opt) {
    super();
    this.config = new ConfigModel();
    this.config.json = _.defaults(opt, this.config.json);
    this.reader = new FileReader();
    this._eventify();
    this._initilize();
  }
  _eventify() {
    this.on("create:rules", this._onCreateRules);
  }
  _initilize() {
    this._getCSSList()
      .then((fileList) => {
        this.emit("create:rules", _.flatten(fileList));
      });
  }
  _getCSSList() {
    var source = this.config.json.source;
    return this.reader.findBySource(source, ".css");
  }
  _onCreateRules(cssList) {
    this.rules = new RuleCollection({cssList});
    this.rules.on('end:createcollection', () => {
    this.writeHTMLbyCSS();
    this.writeHTMLbyCategory();
    });
  }
  writeHTMLbyCSS() {
    this.rules.writeHTML();
    // _.each(this.rules, (rule) => {
    //   rule.writeHTML();
    // });
  }
  writeHTMLbyCategory(categoryName) {
    this.rules.writeHTMLbyCategory(categoryName);
  }
}
