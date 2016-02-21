var _ = require('underscore');
var system = require('./system');
var parser = require('./parser');
var reader = require('./reader');
var replaceCustomSyntax = require('./syntax/index');

var Aigis = (function() {
  function Aigis(configFile) {
    var options;

    try {
      if (_.isString(configFile)) {
        options = system.configLoader(configFile);
      }
      else {
        options = system.configParser(configFile);
      }
    }
    catch (e) {
      throw new Error(e);
    }
    this.options = _.extend({}, system.DEFAULT_OPTIONS, options);
  }

  Aigis.prototype = {
    constructor: Aigis,

    run: function() {
      console.log('running');
      reader.css(this.options.source)
        .then(parser.css)
        .then(this._replaceCustomSyntax.bind(this))
        .then((modules) => {
          console.log(modules);
        })
        .catch(function(e) {
          console.error(e.message);
        });
    },

    _setup: function() {

    },

    _replaceCustomSyntax(modules) {
      return replaceCustomSyntax(modules, this.options);
    }

  };

  return Aigis;
})();

module.exports = Aigis;
