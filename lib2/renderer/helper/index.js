var helper = helper || {};
var tree = require('./render_category_tree');

helper.init = function(options, root) {
  helper.renderCategoryTree = function() {
    return tree(options, root);
  };

  // helperフォルダのjsを読む
  // もしくはconfig.ymlに helperName: 'path/to/helper.js' みたいに書いてそれを見てロードする
};

module.exports = helper;
