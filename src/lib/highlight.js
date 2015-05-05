import Highlights from "highlights";

var highlighter = new Highlights();

export default function highlight(code, type) {
  var scope = {
    js: "source.js",
    javascript: "source.js",
    html: "text.html.gohtml",
    block: "text.html.gohtml",
    css: "source.css",
    jade: "source.jade",
    coffee: "source.coffee",
    md: "source.gfm",
    markdown: "source.gfm",
  };
  var scopeName = scope[type] || "text.html.gohtml";
  if (type == "jade") {
    grammarsRegister("jade");
  }
  var html = highlighter.highlightSync({
    fileContents: code,
    scopeName
  });
  if (type) {
    html = `<div class="ronde-codeblock__header">${type}</div>${html}`;
  }
  return html;
}

function grammarsRegister(type) {
  var packageName;
  
  switch(type) {
    case "jade":
      packageName = "language-jade";
      break;
  }
  
  highlighter.requireGrammarsSync({
    modulePath: require.resolve(`${packageName}/package.json`)
  });
}
