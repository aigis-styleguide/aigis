import Handlebars from "handlebars";
import FileReader from "./FileReader";
import ConfigModel from "./ConfigModel";
import path from "path";

export default class Template {
  constructor() {
    this.config = new ConfigModel();
    this.reader = new FileReader();
  }
  compile(data) {
    return this.template(data);
  }
  loadTemplate(name) {
    var templatePath = `./layout/${name}.hbs`;
    templatePath = path.resolve(templatePath);
    var hbs = this.reader.readFileSync(templatePath);
    var template = Handlebars.compile(hbs);
    this.template = template;
  }
}
