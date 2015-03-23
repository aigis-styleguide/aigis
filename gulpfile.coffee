gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
src = "src2/**/*.js"

dist =
  js: "./dist2"

name =
  js: "index.js"

gulp.task "babel", ->
  gulp.src src
    .pipe plumber({errorHandler: notify.onError('<%= error.message %>')})
    .pipe babel
      modules: "common"
    .pipe gulp.dest dist.js

gulp.task "watch", ->
  gulp.watch [src], ["babel"]

gulp.task "default", ["watch"]
    
