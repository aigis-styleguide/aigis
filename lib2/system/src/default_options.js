var path = require("path");
console.log('hohoh:', __dirname);
module.exports = {
  name: "Components Guide",
  source: [__dirname + "/../../static/css"],
  dest: path.resolve("./docs"),
  dependencies: [
    __dirname + "/../../doc_assets"
  ],
  lib: {},
  format: "yaml",
  timestamp_format: "YYYY/MM/DD HH:mm",
  template: __dirname + "/../../../template/index.ejs",
  template_engine: "ejs",
  md_class: {
    blockquote: "",
    heading   : "",
    hr        : "",
    list      : "",
    listitem  : "",
    paragraph : "",
    table     : "",
    tablerow  : "",
    tablecell : "",
    link      : "",
    image     : "",
  },
  highlight: true,
  highlight_theme: "dracula",
  // dark  [monokai, dracula, seti]
  // light [duotone-light, on-light]
  inject: ["html", "jade", "js", "coffee"],
  beautify: false
};
