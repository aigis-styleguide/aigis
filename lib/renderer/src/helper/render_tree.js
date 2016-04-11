var ejs = require('ejs');
var _ = require('lodash');
var path = require('path');

function renderTree(type, tree, depth, root, outputPath, disableIndex) {
  var _index = disableIndex ? '' : 'index.html';
  var ul = ejs.compile(
    '<ul data-path-depth="<%- depth %>">' +
    '<% children.forEach(function(child) { %><%- child %><% }) %>' +
    '</ul>'
  );

  var li = ejs.compile(
    '<li data-path-depth="<%- depth %>">' +
    '<a<% if (href) { %> href="<%- href %>"<% } %><% if (isCurrent) { %> data-tree-current<% } %>><%- name %></a>' +
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
      var isCurrent = false;
      var _out = outputPath;

      if (values.path) {
        relPath = path.join(type, values.path.replace(/\s+/g, '-'), _index);
        href = path.join(root, relPath);
      }
      if (relPath) {
        if (disableIndex) {
          _out = outputPath.split('/');
          _out.pop();
          _out = _out.join('/')
        }
        isCurrent = relPath == _out;
      }

      var html = li({
        name: values.name,
        href: href || '',
        depth: values.depth || '0',
        children: renderTree(type, values.children, depth + 1, root, outputPath, disableIndex),
        outputPath: outputPath,
        relPath: relPath,
        isCurrent: isCurrent
      });

      return html;
    }),
    depth: depth
  });

  return node;
}

module.exports = renderTree;
