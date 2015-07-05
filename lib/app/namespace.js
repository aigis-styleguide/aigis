global._ = require("lodash");
global.EventEmitter = require("eventemitter2").EventEmitter2;
global.Promise = require("bluebird");
global.mediator = new EventEmitter();
global.Event = require("./event");
global.util = require("util");
global.Support = require("./support");
