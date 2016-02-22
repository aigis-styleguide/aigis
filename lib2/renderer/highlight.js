var Highlights = require("highlights");
var highlighter = new Highlights();

module.exports = function highlight(code, type) {
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

  switch(type) {
    case "jade":
      grammarsRegister("jade");
      break;
    case "stylus":
      grammarsRegister("stylus");
      break;
  }
  
  var html = highlighter.highlightSync({
    fileContents: code,
    scopeName: scopeName,
  });
  
  var div = '<div class="aigis-codeblock';
  
  if (type) {
    div += ' aigis-codeblock--' + type;
  }
  div += '">' + html + '</div>';
  
  return div;
};

var loaded = {};
function grammarsRegister(type) {
  var packageName;
  
  // doesn't load same grammar
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
    modulePath: require.resolve(packageName + "/package.json")
  });
}
