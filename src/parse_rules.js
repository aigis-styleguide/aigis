import _ from "lodash";
import YAML from "js-yaml";

export function parseRules(rules) {
  var comments;
  
  rules = _.chain(rules)
    .filter({type: "comment"})
    .value();

  rules = _.map(rules, (rule) => {
    var reg = /-{3}[\s\S]+?-{3}/;
    var yamlStr = rule.comment.match(reg)[0].replace(/---/g, '');
    var yaml = YAML.load(yamlStr);
    var md = rule.comment.replace(reg, '');    
    var source = rule.position.source;
    return { yaml,md,source };
  });

  return rules;
}
