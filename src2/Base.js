import _ from "lodash";
import Promise from "bluebird";
import {EventEmitter} from "events";

export default class Base extends EventEmitter{
  constructor() {
    super();
  }
}
