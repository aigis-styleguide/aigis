import Base from "./Base";
import _ from "lodash";
import FileReader from "./FileReader";
import RuleModel from "./RuleModel";

export default class RuleCollection extends Base{
  constructor(opt) {
    super();
    this.reader = new FileReader();
    this.cssList = opt.cssList;
    this.models = _.map(this.cssList, (source) => {
      return new RuleModel({source});
    });
    setImmediate(() => { 
      this.emit("end:createcollection");
    });
  }
  filterByCategory(categoryName) {
    _.filter(this.models, (rule) => {
      console.log(rule);
    });
  }
}
