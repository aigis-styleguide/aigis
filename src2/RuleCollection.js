import Base from "./Base";
import _ from "lodash";
import FileReader from "./FileReader";
import RuleModel from "./RuleModel";
import ConfigModel from "./ConfigModel";
import Template from "./Template";
import FileWriter from "./FileWriter";
import path from "path";

/*
全てのCSSのruleのコレクション
*/
export default class RuleCollection extends Base{
  constructor(opt) {
    super();
    this.reader = new FileReader();
    this.writer = new FileWriter();
    this.cssList = opt.cssList;
    this.rules = _.map(this.cssList, (source) => {
      return new RuleModel({source});
    });
    setImmediate(() => { 
      this.emit("end:createcollection");
    });
  }
  filterByCategory(categoryName) {
    var filteredComments = _.chain(this.rules)
      .map((rule) => {
        return rule.getCommentByCategory(categoryName);
      })
      .flatten()
      .compact()
      .value();
    return filteredComments;
  }
  toHTMLByCategory(categoryName) {
    var html = _.map(this.rules, (rule) => {
      return rule.toHTMLByCategory(categoryName);
    }).join("\n");
    return html;
  }
  getAllCategories() {
    return _.chain(this.rules)
      .map((rule) => {
        return rule.getCategories();
      })
      .flatten()
      .compact()
      .uniq()
      .value();
  }
  writeHTML() {
    _.each(this.rules, (rule) => {
      rule.writeHTML();
    });
  }
  writeHTMLbyCategory() {
    var config = new ConfigModel();
    var dir = config.json.dest + "/category";
    _.each(this.getAllCategories(), (categoryName) => {
      var name = categoryName;
      var html = this.toHTMLByCategory(categoryName);
      var template = new Template();
      template.loadTemplate("base");
      var assets_css = [];
      var assets_js = this.rules[0].getDpendencies(this.filterByCategory(categoryName));
      html = template.compile({body: html, assets_css, assets_js, categoryName});
      this.writer.writeHTML(dir, html, name);
    });
  }
}
