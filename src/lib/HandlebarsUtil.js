import fs from "graceful-fs";
import Handlebars from "handlebars";
import {EventEmitter2 as EventEmitter} from "eventemitter2";
import objectAssign from "object-assign";

export default class HandlebarsUtil extends EventEmitter {
  constructor({config}) {
    this.config = config;
  }
  load(templatePath) {
    var hbs = fs.readFileSync(templatePath, "utf8");
    var template = Handlebars.compile(hbs);
    return template;
  }
  compile(template, props) {
    return template(props);
  }
  build(templatePath, props) {
    var template = this.load(templatePath);
    return this.compile(template, props);
  }
  configCSS() {
    var templatePath = "./layout/css.hbs";
    var assetsPath = this.config.doc_assets;
    var common_assets = objectAssign({}, this.config.common_assets);
    var css = common_assets.css.map((path) => `${assetsPath}/${path}`);
    
    css.push(this.highlight());
    
    return this.build(templatePath, {css, assetsPath});
  }
  assetsCSS() {
    var templatePath = this.config.doc_assets;
    return this.build(templatePath, {assets_css});
  }
  highlight() {
    var syntaxName = this.config.highlight_theme;
    var cssPath = `./ronde_assets/css/highlight/${syntaxName}.css`;
    return cssPath;
  }
}
