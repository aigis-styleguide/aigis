var Moment = require('moment');

function get(options) {
  return Moment().format(options.timestamp_format);
}

module.exports = {
  get: get
};
