import Base from "./Base";
import CSS from "css";
import CSON from "cson";
import YAML from "js-yaml";
import FileReader from "./FileReader";
import _ from "lodash";
import marked from "marked";
import Highlights from "highlights";
import MarkedCustomRenderer from "./MarkedCustomRenderer";

export default class RuleModel extends Base{
  constructor(opt) {
    super();
    this.opt = opt;
    this.source = opt.source;
    this.reader = new FileReader();
    this._initilize(opt);
  }
  _initilize() {
    this.file = this.reader.readFileSync(this.source);
    this.ast = CSS.parse(this.file, {source: this.source});
    this.type = this.ast.type;
    this.rules = this.ast.stylesheet.rules;
    this.commentRules = this.getCommentRules();
    this.parse();
    this.inject();
  }
  get(key) {
    return this[key];
  }
  set(key, value) {
    this[key] = value;
  }
  getCommentRules() {
    return _.filter(this.rules, {type: "comment"});
  }
  getCommentBody() {
    return _.pluck(this.comments, "comment");
  }
  parse() {
    _.each(this.commentRules, (rule) => {
      var reg = /-{3}[\s\S]+?-{3}/;
      var cson = rule.comment.match(reg)[0].replace(/---/g, "");
      var md = rule.comment.replace(reg, "");
      this.cson = CSON.parse(cson);
      this.md = md;
    });
  }
  inject(opt) {
    var injectHtml = this.opt.injectHtml;
    var injectScript = this.opt.injectScript;
    
    injectHtml = injectHtml === undefined ? true : injectHtml;
    injectScript = injectScript === undefined ? true : injectScript;
    
    if (injectHtml) {
      this.injectHTML();
    }
    if (injectScript) {
      this.injectSCRIPT();
    }
  }
  injectHTML() {
    var reg = /`{3}(html|block|\n)+[\s\S]*?`{3}/;
    var md = this.md.replace(reg, (codeblock) => {
      var reg = /`{3}(html|block|\n)+/;
      var html = codeblock.replace(reg, "").replace(/`{3}/, "");
      return `${html}\n\n${codeblock}`;
    });
    this.md = md;
  }
  injectSCRIPT() {
    var reg = /`{3}(js|javascript)+[\s\S]*?`{3}/;
    var md = this.md.replace(reg, (codeblock) => {
      var reg = /`{3}(js|javascript)+/;
      var script = codeblock.replace(reg, "").replace(/`{3}/, "");
      return `${codeblock}\n\n<script>${script}</script>`;
    });
    this.md = md;
  }
  toHTML(opt = { hightlight: true }) {
    if (opt.hightlight) {
      // this.setOptions();
    }
    var renderer = new MarkedCustomRenderer({
      li: "listitem"
    });
    return marked(this.md, {renderer});
  }
  setOptions() {
    marked.setOptions({
      highlight: function (code, type) {
        var scope = {
          js: "source.js",
          javascript: "source.js",
          html: "text.html.gohtml",
          block: "text.html.gohtml",
          css: "source.css"
        };
        var scopeName = scope[type] || "text.html.gohtml";
        
        var highlighter = new Highlights();
        var html = highlighter.highlightSync({
          fileContents: code,
          scopeName
        });
        if (type) {
          html = `<div class="ronde-codeblock__header">${type}</div>${html}`;
        }
        return html;
      }
    });
  }
}
