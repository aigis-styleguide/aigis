import _ from "lodash";
import YAML from "js-yaml";

export function parseRules(rules) {
  var comments;
  
  comments = _.chain(rules)
    .filter({type: "comment"})
    .pluck("comment").value();
  rules = _.map(comments, (comment) => {
    var reg = /---[\s\S]*---/;
    var yamlStr = comment.match(reg)[0].replace(/---/g, '');
    var yaml = YAML.load(yamlStr);
    var md = comment.replace(reg, '');    

    return { yaml,md };
  });

  return rules;
}
