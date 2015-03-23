import path from "path";
import _ from "lodash";

export function setAssetsPath(categorizedComment) {
  
  _.each(_.keys(categorizedComment), (categoryName) => {
    var js = [];
    var css = [];
    _.each(categorizedComment[categoryName].libs, (libName) => {
      var ext = path.extname(libName);
      if (ext === ".js") {
        js.push(`../assets/js/lib/${libName}`);
      }
      if (ext === ".css") {
        css.push(`../assets/css/lib/${libName}`);
      }
    });
    categorizedComment[categoryName].assets = {js,css};
  });
}
