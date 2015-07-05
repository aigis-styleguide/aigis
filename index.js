var Aigis = require("./lib/Aigis");

var config = require("./lib/reader/config")("./config.yaml");
var aigis = new Aigis(config);
aigis.run();
