import Handlebars from "Handlebars";
import _ from "lodash";
import fs from "fs-extra";

export default class Render {
  constructor(config) {
    this.config = config;
    this.headerTmpl = this.compile("header");
    this.contentsTmpl = this.compile("contents");
    this.footerTmpl = this.compile("footer");
  }
  build({footer, contents, header, name}) {
    var headerHtml = this.headerTmpl(header);
    var footerHtml = this.footerTmpl(footer);
    var contentsHtml = this.contentsTmpl({
      header: headerHtml,
      footer: footerHtml,
      contents: contents,
      name,
    });
    return contentsHtml;
  }
  compile(templateName) {
    var config = this.config;
    return Handlebars.compile(fs.readFileSync(`${config.layout_template}/${templateName}.hbs`, "utf8"));
  }
}
