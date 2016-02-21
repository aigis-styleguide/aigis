var helper = helper || {};

helper.init = function(options, root) {

  helper.renderCategoryTree = function() {
   var tree = require('./render_category_tree');
   return tree(options, root);
  };

  // helperフォルダのjsを読む
  // もしくはconfig.ymlに helperName: 'path/to/helper.js' みたいに書いてそれを見てロードする
};

module.exports = helper;
