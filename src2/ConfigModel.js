import Base from "./Base";
import Promise from "bluebird";
import FileReader from "./FileReader";
import CSON from "cson";

export default class ConfigModel extends Base{
  constructor(opt) {
    super();
    this.PATH = "./config.cson";
    this.reader = new FileReader();
    this.fetch();
  }
  fetch() {
    var cson = this.reader.readFileSync(this.PATH);
    this.json = CSON.parse(cson);
  }  
}
