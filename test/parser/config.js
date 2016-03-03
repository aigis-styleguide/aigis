var assert = require("power-assert");
var fs = require("fs-extra");
var path = require("path");
var configParser = require("../../lib/parser/config");

describe("lib/parser/config", function() {

  it("設定ファイルの内容をパースできること", function() {
    var filePath = __dirname + "/../test_assets/config.yml";
    var fileBuffer = fs.readFileSync(path.resolve(filePath));
    var config = configParser(fileBuffer);
    assert.equal(config.name, "StyleGuide Name");
    assert.equal(config.source.length, 2);
    assert.equal(config.md_class.blockquote, "sg-blockquote");
  });

});
