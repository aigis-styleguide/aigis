var defaultConfig;

export default defaultConfig = {
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
  inject: {
    html: true,
    jade: true,
    js: true,
    coffee: false,
  }
};
