var DEFAULT_OPTIONS = {
  name: "Components Guide",
  source: ["./static/css"],
  dest: "./docs",
  dependencies: [],
  lib: {},
  format: "yaml",
  timestamp_format: "YYYY/MM/DD HH:mm",
  md_template: "./md_template",
  layout_template: "./layout_template",
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
  inject: ["html", "jade", "js", "coffee"]
};

module.exports = DEFAULT_OPTIONS;
