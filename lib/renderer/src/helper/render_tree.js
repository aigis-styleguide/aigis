var ejs = require('ejs');
var _ = require('lodash');
var path = require('path');

function renderTree(tree, depth, root, outputPath) {
  var ul = ejs.compile(
    '<ul data-path-depth="<%- depth %>">' +
    '<% children.forEach(function(child) { %><%- child %><% }) %>' +
    '</ul>'
  );

  var li = ejs.compile(
    '<li data-path-depth="<%- depth %>">' +
    '<a<% if (href) { %> href="<%- href %>"<% } %><% if (relPath && relPath == outputPath) { %> data-tree-current<% } %>><%- name %></a>' +
    '<%- children %>' +
    '</li>'
  );

  if (!tree) {
    return '';
  }
  var node = ul({
    children: _.map(tree, function(values, name) {
      var href;
      var relPath;

      if (values.path) {
        href = path.join(root, 'category', values.path.replace(/\s+/g, '-'), 'index.html');
        relPath = path.join('category', values.path.replace(/\s+/g, '-'), 'index.html');
      }

      var html = li({
        name: values.name,
        href: href || '',
        depth: values.depth || '0',
        children: renderTree(values.children, depth + 1, root, outputPath),
        outputPath: outputPath,
        relPath: relPath
      });

      return html;
    }),
    depth: depth
  });

  return node;
}

module.exports = renderTree;
