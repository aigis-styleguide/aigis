var assert = require("power-assert");
var createCategoryTree = require("../../lib/parser/tree");

describe("lib/parser/tree", function() {
  it("カテゴリのパスからツリーができること", function() {
    var category = [
      "test",
      "test/module",
      "test/module2/hoge",
    ];
    var tree = createCategoryTree(category);
    assert(tree.test);
    assert.equal(tree.test.depth, 0);
    assert(tree.test.children.module);
    assert.equal(tree.test.children.module.depth, 1);
    assert(tree.test.children.module2.children.hoge);
    assert.equal(tree.test.children.module2.children.hoge.depth, 2);
  });
});
