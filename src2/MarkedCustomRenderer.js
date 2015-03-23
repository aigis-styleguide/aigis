import marked from "marked";
import Handlebars from "handlebars";
import FileReader from "./FileReader";
import ConfigModel from "./ConfigModel";
import path from "path";

export default class MarkedCustomRenderer extends marked.Renderer {
  constructor(opt) {
    super();
    this.opt = opt;
    this.config = new ConfigModel();
    this.reader = new FileReader();
    this.templateDir = this.config.json.md_template || "./renderer_template";
  }
  listitem(text) {
    var type = "listitem";
    var classes = this.config.json.md_class[type];
    var template = this.loadTemplate("listitem");
    var html = template({text,classes});
    console.log(html);
    return html;
  }
  loadTemplate(type) {
    var templatePath = `${this.templateDir}/${type}.hbs`;
    templatePath = path.resolve(templatePath);
    var hbs = this.reader.readFileSync(templatePath);
    var template = Handlebars.compile(hbs);
    return template;
  }
}
