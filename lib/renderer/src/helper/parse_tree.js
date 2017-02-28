var _ = require('lodash');

function parseTree(categories) {
  var tree = _.map(categories, function(cpath) {
    return createTreeNode(cpath, cpath, 0);
  });

  var mergedTree = _.reduce(tree, function(ret, obj) {
    ret = _.merge(ret, obj);
    return ret;
  }, {});

  return mergedTree;
}

function createTreeNode(cpath, origin, depth) {
  var names = cpath.split('/');
  var name = names.shift();
  var category = {};

  if (names.length === 0) {
    category[name] = {
      path: origin,
      name: name,
      depth: depth++
    };
    return category;
  }

  category[name] = {
    name: name,
    depth: depth++,
    children: createTreeNode(names.join('/'), origin, depth)
  };

  return category;
}

module.exports = parseTree;
