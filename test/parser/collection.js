var assert = require("power-assert");
var collection = require("../../lib/parser/collection");

describe("lib/parser/collection", function() {

  it("指定した設定項目を抽出できること", function() {
    var modules = [
      { config: { tag: ["tag-1", "tag-2"] } },
      { config: { tag: ["tag-1", "tag-3", "tag-4"] } }
    ];
    var result = collection(modules, "tag");
    assert.deepEqual(result, [ "tag-1", "tag-2", "tag-3", "tag-4" ]);
  });

});
