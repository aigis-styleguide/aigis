var path = require("path");
var _ = require("lodash");
var path = require("path");

function createCategoryTree(category) {

  var tree = {name: "root"};
  var categoryTree = [];

  _.each(category, function(name) {
    var names = name.split(path.sep);
    _.reduce(names, function(ret, name, n) {
      var root = ret.root;
      var categoryPath = path.join(ret.path, name);
      var level = ret.level + 1;
      
      var node = {
        name: name,
        path: categoryPath,
        level: level
      };
      var exist = _.find(root.children, function(child) {
        return child.name === name;
      });
      
      if (exist) {
        ret = {path :categoryPath, root: exist, level: level};
        return ret;
      }
      else {
        root.children = root.children || [];
        root.children.push(node);
        ret = {path: categoryPath, root: node, level: level};
        categoryTree.push(node);
        return ret;
      }
    }, {path: "", root : tree, level: -1});
  });
  
  return categoryTree;
}

module.exports = createCategoryTree;
