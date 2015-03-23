import Promise from "bluebird";
import Base from "./Base";
import ConfigModel from "./ConfigModel";
import FileReader from "./FileReader";
import RulesCollection from "./RuleCollection";
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
      .then((x) => {
        this.emit("create:rules", x[0]);
      });
  }
  _getCSSList() {
    var source = this.config.json.source;
    return this.reader.findBySource(source, ".css");
  }
  _onCreateRules(cssList) {
    this.rules = new RulesCollection({cssList});
    this.rules.on('end:createcollection', () => {
      this.rules.filterByCategory("test");
    });
  }
}
