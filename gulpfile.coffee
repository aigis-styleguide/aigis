gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
process = require "child_process"
exec = process.exec
runseq = require "run-sequence"

src = ["src/**/*.js"]
css = ["css/**/*.css"]

dist =
  js: "./dist"

name =
  js: "index.js"

index = "./dist/index.js"

gulp.task "exec:index", (cb) ->
  exec "node #{index}" , (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb()

gulp.task "babel", ->
  gulp.src src
    .pipe plumber({errorHandler: notify.onError('<%= error.message %>')})
    .pipe babel
      modules: "common"
      blacklist: "strict"
    .pipe gulp.dest dist.js

gulp.task "babel:exec", ->
  runseq "babel", "exec:index"

gulp.task "watch", ->
  gulp.watch [src], ["babel:exec"]
  gulp.watch [css], ["exec:index"]

gulp.task "babel:watch", ->
  gulp.watch [src], ["babel"]

gulp.task "default", ["watch"]
    
