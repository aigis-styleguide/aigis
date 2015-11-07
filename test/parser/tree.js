var assert = require("power-assert");
var createCategoryTree = require("../../lib/parser/tree");

describe("lib/parser/tree", function() {
  it("カテゴリのパスからツリーができること", function() {
    var category = [
      "test",
      "test/module/hoge",
      "test/module2/hoge",
    ];
    var tree = createCategoryTree(category);
    assert.equal(tree.length, 5);
    assert.equal(tree[0].name, "test");
    assert.equal(tree[0].children.length, 2);
    assert.equal(tree[4].level, 2);
  });
});
