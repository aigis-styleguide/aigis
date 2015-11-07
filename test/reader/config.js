var assert = require("power-assert");
var readConfigFile = require("../../lib/reader/config");

describe("lib/reader/config", function() {
  it("config.yamlが読み込めること", function() {
    var config = readConfigFile(__dirname + "/../test_assets/config.yaml");
    assert.equal(config.name, "test_project");
  });
});
