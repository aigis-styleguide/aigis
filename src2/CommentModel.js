import Base from "./Base";
import _ from "lodash";
import CSON from "cson";
import marked from "marked";
import Highlights from "highlights";
import MarkedCustomRenderer from "./MarkedCustomRenderer";

/*
コメントブロック1つ単位のモデル
mdとかcsonとか持ってる
*/
export default class CommentModel {
  constructor(opt) {
    super();
    this.opt = opt;
    this.parse(opt.rule);
    this.inject();
  }
  parse(rule) {
    var reg = /-{3}[\s\S]+?-{3}/;
    var cson = rule.comment.match(reg)[0].replace(/---/g, "");
    var md = rule.comment.replace(reg, "");
    this.cson = CSON.parse(cson);
    this.md = md;
  }
  inject() {
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
      this.setOptions();
    }
    var renderer = new MarkedCustomRenderer();
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
