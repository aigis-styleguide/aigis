var assert = require("power-assert");
require("../../lib/app/namespace");
var readCSSFiles = require("../../lib/reader/css");

describe("lib/reader/css", function() {
  it("文字列のパス指定でCSSが読み込めること", function(done) {
    mediator.on(Event.END_LOAD_CSS_FILES, cb);
    
    function cb(files) {
      mediator.off(Event.END_LOAD_CSS_FILES, cb);
      assert(files.length);
      done();
    }
    
    readCSSFiles(__dirname + "/../test_assets");
  });
  it("配列のパス指定でCSSが読み込めること", function(done) {
    mediator.on(Event.END_LOAD_CSS_FILES, cb);
    
    function cb(files) {
      mediator.off(Event.END_LOAD_CSS_FILES, cb);
      assert(files.length);
      done();
    };
    
    readCSSFiles([__dirname + "/../test_assets/test.css"]);
  });
});
