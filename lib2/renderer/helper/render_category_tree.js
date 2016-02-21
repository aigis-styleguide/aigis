var parser = require('../../parser');
var renderer = require('../../renderer');

function renderCategoryTree (config, root) {
  var tree = parser.tree(config.category);
  var html = renderer.tree(tree, 0, root);
  return html;
}

module.exports = renderCategoryTree;
