var _ = require('lodash');
var path = require('path');

function getRoot(outputPath, options) {
  var level = _.compact(outputPath
      .replace(path.normalize(options.dest + '/'), '')
      .replace('index.html', '')
      .split('/')
  ).length;
  var dots = '';
  if (level === 0) {
    return './';
  }

  for(var i = 0; i < level; i++) {
    dots += '../';
  }

  return dots;
}

module.exports = getRoot;
