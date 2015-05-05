var defaultConfig;

export default defaultConfig = {
  name: "Components Guide",
  source: ["./doc_assets/css"],
  dest: "./docs",
  doc_assets: ["./doc_assets"],
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
  highlight_theme: "monokai",
  dependencies: []
};
