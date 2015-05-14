import path from "path";
import through from "through2";
import objectAssign from "object-assign";
import _ from "lodash";
import CSS from "css";
import CSON from "cson";
import stylus from "stylus";
import sass from "node-sass";
import YAML from "js-yaml";

export default function parseCSS (config) {
  var format = config.format || "cson";
  format = format.toLowerCase();
  
  return through.obj(function(file, enc, cb) {
    var css, content;
    var ext  = path.extname(file.path);
    var source = file.path;
    
    console.log(file.path);
    
    switch(ext.toLowerCase()) {
      case ".css":
        content = file.contents.toString();
        break;
      case ".styl":
        alt = stylus.render(file.contents.toString());
        content = alt;
        break;
      case ".scss":
      case ".sass":
        alt = sass.renderSync({
          data: file.contents.toString()
        });
        content = alt.css.toString();
        break;
    }
    css = CSS.parse(content, {source});

    _.chain(css.stylesheet.rules)
      .filter({type: "comment"})
      .each((rule) => {
        var config, configString;
        var comment = rule.comment;
        var source = rule.position.source;
        var filePath = "/" + path.relative("./", source);
        var reg = /-{3}[\s\S]+?-{3}/;
        var matched = comment.match(reg);
        
        if (matched === null) return;
        
        configString = matched[0].replace(/-{3}/g, "");
        
        switch(format) {
          case "cson":
            config = CSON.parse(configString);
            if (config instanceof Error) {
              return;
            }
            break;
          case "yaml":
            try{
              config = YAML.load(configString);
            }
            catch (e) {
              return;
            }
            break;
        }
        
        // try {
        //   config = YAML.load(configString);
        // }
        // catch(e) {
        //   config = CSON.parse(configString);
        // }
        // finally {
        //   if (config instanceof Error) {
        //     return;
        //   }
        // }

        config._filePath = filePath;
        var md = comment.replace(reg, "");
        var obj = objectAssign({},{config, md, source});
        
        this.push(obj);
      })
      .value();
    cb();
  }, function(cb) {
    cb();
  });
}
