import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export function mdToHTML(comment) {
  return marked(comment.md);
}
