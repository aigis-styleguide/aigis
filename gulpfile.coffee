gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"

src = "./src/**/*.js"

dist =
  js: "./dist"

name =
  js: "index.js"

gulp.task "babel", ->
  gulp.src src
    .pipe babel
      modules: "common"
    .pipe gulp.dest dist.js

gulp.task "watch", ->
  gulp.watch [src], ["babel"]

gulp.task "default", ["watch"]
    
