import _ from "lodash";

export function pluckCategories(parsedRules) {
  var categories = _.map(parsedRules, (comments) => {
    var categories = _.chain(comments).map((comment) => {
      return comment.yaml.category;
    })
    .compact()
    .flatten()
    .value();
    return categories;
  });
  return _.chain(categories).flatten().uniq().value();
}
