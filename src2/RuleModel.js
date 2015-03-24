import Base from "./Base";
import CSS from "css";
import CSON from "cson";
import FileReader from "./FileReader";
import _ from "lodash";
import path from "path";
import CommentModel from "./CommentModel";
import FileWriter from "./FileWriter";
import ConfigModel from "./ConfigModel";
import Template from "./Template";

/*
CSS1ファイル単位のモデル
*/ 
export default class RuleModel extends Base{
  constructor(opt) {
    super();
    this.opt = opt;
    this.source = opt.source;
    this.writer = new FileWriter();
    this.reader = new FileReader();
    this._initilize(opt);
  }
  _initilize() {
    this.file = this.reader.readFileSync(this.source);
    this.ast = CSS.parse(this.file, {source: this.source});
    this.type = this.ast.type;
    this.comments = _.map(this.getCommentRules(), (rule) => {
      return new CommentModel({rule});
    });
  }
  getCommentRules() {
    return _.filter(this.ast.stylesheet.rules, {type: "comment"});
  }
  getCommentBody() {
    return _.pluck(this.comments, "comment");
  }
  getCommentByCategory(categoryName) {
    return _.filter(this.comments, (comment) => {
      return _.includes(comment.cson.category, categoryName);
    });
  }
  toHTML() {
    var html = _.map(this.comments, (comment) => {
      return comment.toHTML();
    }).join("\n");
    return html;
  }
  toHTMLByCategory(categoryName) {
    var html = _.map(this.getCommentByCategory(categoryName), (comment) => {
      return comment.toHTML();
    }).join("\n");
    return html;
  }
  getDpendencies(comments) {
    var config = new ConfigModel();
    comments = comments || this.comments;
    
    return _.chain(comments)
      .map((comment) => {
        return comment.cson.libs;
      })
      .flatten()
      .compact()
      .map((name) => {
        return config.json.libs[name];
      })
      .value();
  }
  getCategories() {
    return _.chain(this.comments)
      .map((comment) => {
        return comment.cson.category;
      })
      .flatten()
      .compact()
      .uniq()
      .value();
  }
  writeHTML() {
    var config = new ConfigModel();
    var dir = config.json.dest;
    var name = path.basename(this.source, ".css");
    var html = this.toHTML();
    var template = new Template();
    template.loadTemplate("base");
    var assets_css = [];
    assets_css.push(path.relative(".", this.source));
    var assets_js = this.getDpendencies();
    html = template.compile({body: html, assets_css, assets_js});
    this.writer.writeHTML(dir, html, name);
  }
}
