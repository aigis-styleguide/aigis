var assert = require("power-assert");
var readCSSFiles = require("../../lib/reader/css");
var parseCSS = require("../../lib/parser/css");

describe("lib/parser/css", function() {

  it("CSSのコメントブロックがパースできること", function(done) {
    readCSSFiles(__dirname + "/../test_assets/test.css").then(function(files){
      var module = parseCSS(files)[0];
      assert.equal(module.config.name, "test");
      assert.equal(module.config.category[0], "Module");
      assert.equal(module.config.tag[0], "tag1");
      done();
    });
  });

  it("CSSのコメントブロックが複数パースできること", function(done) {
    readCSSFiles(__dirname + "/../test_assets/test.css").then(function(files){
      var module1 = parseCSS(files)[0];
      var module2 = parseCSS(files)[1];
      assert.equal(module1.config.name, "test");
      assert.equal(module2.config.name, "test2");
      done();
    });
  });

});
