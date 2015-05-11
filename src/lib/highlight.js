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
    scss: "source.css.scss",
    sass: "source.sass",
    less: "source.css.less",
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
    html = `<div class="ronde-codeblock ronde-codeblock--${type}">${html}</div>`;
  }
  else {
    html = `<div class="ronde-codeblock">${html}</div>`;
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
