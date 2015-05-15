import through from "through2";
import _ from "lodash";

export default function extendConfig(config) {
    var categoryList = [];
    var tagList = [];
    
  return through.obj(function(comment, enc, cb) {
    _.each(comment.config.category, name => categoryList.push(name));
    _.each(comment.config.tag, name => tagList.push(name));
    
    this.push(comment);
    cb();
  }, function(cb) {
    config.categoryList = _.sortBy(_.uniq(categoryList));
    config.tagList = _.sortBy(_.uniq(tagList));
    cb();
  });
}
