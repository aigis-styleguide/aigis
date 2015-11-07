var assert = require("power-assert");
var readCSSFiles = require("../../lib/reader/css");

describe("lib/reader/css", function() {
  it("文字列のパス指定でCSSが読み込めること", function(done) {
    readCSSFiles(__dirname + "/../test_assets").then(function(files){
      assert(files.length);
      done();
    });
  });
  it("配列のパス指定でCSSが読み込めること", function(done) {
    readCSSFiles([__dirname + "/../test_assets/test.css"]).then(function(files){
      assert(files.length);
      done();
    });
  });
});
