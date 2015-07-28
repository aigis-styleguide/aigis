global._ = require("lodash");
global.EventEmitter = require("eventemitter2").EventEmitter2;
global.mediator = new EventEmitter();
global.Event = require("./event");
