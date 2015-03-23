import marked from "marked";
import hljs from "highlight.js";
import {injectHTMLBlock} from "./inject_html_block";
import Highlights from "highlights";

marked.setOptions({
  highlight: function (code, type) {
    var scope = {
      js: "source.js",
      javascript: "source.js",
      html: "text.html.gohtml",
      block: "text.html.gohtml"
    };
    var scopeName = scope[type] || "text.html.gohtml";
    
    var highlighter = new Highlights();
    var html = highlighter.highlightSync({
      fileContents: code,
      scopeName
    });
    return html;
  }
});

export function mdToHTML(comment) {
  injectHTMLBlock(comment);
  return marked(comment.md);
}
