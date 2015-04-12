import marked from "marked";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs";
import objectAssign from "object-assign";
import defaultConfig from "./defaultConfig";
import _ from "lodash";
import highlight from "./highlight";

export default class MarkedCustomRenderer extends marked.Renderer {
  constructor({config}) {
    super();
    this.config = config || defaultConfig;
    this._enableSyntaxHighlight();
    this._defineRenderer();
  }
  _defineRenderer() {
    _.each(this.config.md_class, (val, type) => {
      this[type] = (...args) => {
        return this._render(type, args);
      };
    });
  }
  _render(type, args) {
    var props = this._genProps(type,args);
    var template = this._loadTemplate(type);
    var html = template(props);
    return html;
  }
  _loadTemplate(type) {
    var templatePath = `${this.config.md_template}/${type}.hbs`;
    templatePath = path.resolve(templatePath);
    var hbs = fs.readFileSync(templatePath, "utf8");
    var template = Handlebars.compile(hbs);
    return template;
  }
  _genProps(type, args) {
    var props = this._argsToHandlebarsProps(type,args);
    var classes = this.config.md_class[type];
    props = objectAssign(props,{classes}); 
    return props;
  }
  _argsToHandlebarsProps(type, args) {
    var code, language, quote, text, html, level, body, ordered, header, context, content, flags, tag, align, raw, id;

    switch(type) {
      case "code":
        [code, language] = args;
        break;
      case "block":
        [quote] = args;
        break;
      case "html":
        [html] = args;
        break;
      case "heading":
        [text, level, raw] = args;
        id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
        break;
      case "list":
        [body, ordered] = args;
        tag = ordered ? "ol" : "ul";
        break;
      case "listitem":
        [text] = args;
        break;
      case "paragraph":
        [text] = args;
        break;
      case "table":
        [header, body] = args;
        break;
      case "tablerow":
        [content] = args;
        break;
      case "tablecell":
        [content, flags] = args;
        tag = flags.header ? "th" : "td";
        align = flags.align ? flags.align : undefined;
    }
    
    var props =  _.omit({code, language, quote, text, html, level, body, ordered, header, context, content, flags, tag, align, id}, (val,prop) => {
      return _.isUndefined(val);
    });
    return props;
  }
  _enableSyntaxHighlight() {
    if (this.config.highlight === "enable") {
      marked.setOptions({ highlight });
    }
  }
}
