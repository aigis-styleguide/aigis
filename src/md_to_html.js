import marked from "marked";
import hljs from "highlight.js";
import {injectHTMLBlock} from "./inject_html_block";

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export function mdToHTML(comment) {
  injectHTMLBlock(comment);
  return marked(comment.md);
}
