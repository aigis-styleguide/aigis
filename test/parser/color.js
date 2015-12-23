var assert = require("power-assert");
var readCSSFiles = require("../../lib/reader/css");
var color = require("../../lib/parser/color");

describe("lib/parser/color", function() {

  it("CSSで定義された色情報が取得できている", function(done) {
    readCSSFiles(__dirname + "/../test_assets/color.css").then(function(files){
      var _colorList = [ '#000', '#add39f', '#c3ecb4', 'black', 'rgb(0,0,0)', 'rgba(0,0,0,1)' ];
      var colorList = color(files);
      assert.deepEqual(colorList, _colorList);
      done();
    });
  });

});

