var assert = require("power-assert");
var readConfigFile = require("../../lib/reader/config");

describe("lib/reader/config", function() {
  it("config.ymlが読み込めること", function() {
    var config = readConfigFile(__dirname + "/../test_assets/config.yml");
    assert.equal(config.name, "StyleGuide Name");
  });
});
