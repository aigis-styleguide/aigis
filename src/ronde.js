import Promise from "bluebird";
import _ from "lodash";
import {parseRules} from "./parse_rules";
import {loadConfigCSON} from "./load_config_cson";
import {loadCssFiles} from "./load_css_files";
import {mdToHTML} from "./md_to_html";
import {writeHTML} from "./write_html";

export function Ronde() {  
  Promise.all([
    loadConfigCSON(),
    loadCssFiles()
  ])
  .then( (ret) => {
    var config = ret[0];
    var rule = ret[1];
    var comments = parseRules(rule);
    _.each(comments, (comment) => {
      comment.html = mdToHTML(comment);
      writeHTML(comment);
    });
  });
}
