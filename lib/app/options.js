module.exports = {
  name: "Components Guide",
  source: ["./static/css"],
  dest: "./docs",
  dependencies: [],
  lib: {},
  format: "yaml",
  timestamp_format: "YYYY/MM/DD HH:mm",
  template: "./template",
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
  inject: ["html", "jade", "js", "coffee"]
};
