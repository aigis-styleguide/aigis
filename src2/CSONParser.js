import CSON from "cson";
export default class CSONParser extends Base{
  constructor(opt) {
    super();
  }
  parse(cson) {
    return CSON.parse(cson);
  }
}
