import Highlights from "highlights";

var highlighter = new Highlights();

export default function highlight(code, type) {
  var scope = {
    js: "source.js",
    javascript: "source.js",
    html: "text.html.gohtml",
    block: "text.html.gohtml",
    css: "source.css"
  };
  var scopeName = scope[type] || "text.html.gohtml";
  var html = highlighter.highlightSync({
    fileContents: code,
    scopeName
  });
  if (type) {
    html = `<div class="ronde-codeblock__header">${type}</div>${html}`;
  }
  return html;
}
