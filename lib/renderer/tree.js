var ejs = require('ejs');
var _ = require('lodash');
var path = require('path');

function renderCategoryTree(tree, depth, root) {
  var ul = ejs.compile(
    '<ul class="aigis-categoryList" data-path-depth="<%- depth %>">' +
      '<% children.forEach(function(child) { %><%- child %><% }) %>' +
    '</ul>'
  );

  var li = ejs.compile(
    '<li class="aigis-categoryList__item" data-path-depth="<%- depth %>">' +
      '<a<% if (href) { %> href="<%- href %>"<% } %>><%- name %></a>' +
      '<%- children %>' +
    '</li>'
  );

  if (!tree) {
    return '';
  }
  var node = ul({
    children: _.map(tree, function(values, name) {
      var href;

      if (values.path) {
        href = path.join(root, 'category', values.path, 'index.html');
      }

      var html = li({
        name: values.name,
        href: href || '',
        depth: values.depth || '0',
        children: renderCategoryTree(values.children, depth + 1, root)
      });

      return html;
    }),
    depth: depth
  });

  return node;
}

module.exports = renderCategoryTree;
