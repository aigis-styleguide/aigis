var defaultConfig;

export default defaultConfig = {
  name: "Components Guide",
  source: ["./static/css"],
  dest: "./docs",
  dependencies: [],
  lib: {},
  md_template: "./md_template",
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
  highlight_theme: "monokai",
};
