import Promise from "bluebird";
import _ from "lodash";
import {parseRules} from "./parse_rules";
import {loadConfigCSON} from "./load_config_cson";
import {loadCssFiles} from "./load_css_files";
import {mdToHTML} from "./md_to_html";
import {writeHTML} from "./write_html";
import {writeCategolizedHTML} from "./write_categorized_html";
import {pluckCategories} from "./pluck_categories";
import {copyAssets} from "./copy_assets";

export function Ronde() {
  loadConfigCSON().then((config) => {
    copyAssets(config);
    loadCssFiles(config).then((rules) => {
      var parsedRules = _.map(rules, (rule) => {
        return parseRules(rule);
      });
      
      var categories = pluckCategories(parsedRules);
      var categorizedComment = {};
      _.each(categories, (category) => {
        categorizedComment[category] = [];
      });
      
      _.each(parsedRules, (comments) => {
        _.each(comments, (comment) => {
          // comment.html = mdToHTML(comment);
          categorizedComment[comment.yaml.category].push(comment);
        });
        // console.log(comment);
        // writeHTML(comment, config);
      });
      // console.log(categorizedComment);
      writeCategolizedHTML(categorizedComment, config);
    });
  });
}
