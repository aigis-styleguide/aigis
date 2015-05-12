import Highlights from "highlights";

var highlighter = new Highlights();

export default function highlight(code, type) {
  type = type || "";
  var scope = {
    js: "source.js", javascript: "source.js",
    html: "text.html.gohtml",
    block: "text.html.gohtml",
    css: "source.css",
    jade: "source.jade",
    coffee: "source.coffee",
    md: "source.gfm", markdown: "source.gfm",
    scss: "source.css.scss",
    sass: "source.sass",
    less: "source.css.less",
    stylus: "source.stylus",
    json: "source.json",
    cson: "source.coffee",
  };
  type = type.toLowerCase();
  
  var scopeName = scope[type] || "text.html.gohtml";
  
  if (type == "jade") {
    grammarsRegister("jade");
  }
  if (type == "stylus") {
    grammarsRegister("stylus");
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

var loaded = {};
function grammarsRegister(type) {
  var packageName;
  
  // 一度読み込んだgrammarは読み込まない
  if (loaded[type]) return;
  switch(type) {
    case "jade":
      packageName = "language-jade";
      loaded[type] = true;
      break;
    case "stylus":
      packageName = "language-stylus";
      loaded[type] = true;
      break;
  }
  
  highlighter.requireGrammarsSync({
    modulePath: require.resolve(`${packageName}/package.json`)
  });
}
