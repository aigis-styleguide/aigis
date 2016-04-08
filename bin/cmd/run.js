exports.builder = {
  'c': {
    alias: 'config',
    describe: 'Path to config file',
    default: './aigis_config.yml'
  }
};

exports.handler = function run(argv) {
  var Aigis = require('../../index');
  var aigis;

  try {
    aigis = new Aigis(argv.config);
    aigis.run();
  }
  catch(e) {
    console.error(e.message);
    process.exit(1);
  }
};
