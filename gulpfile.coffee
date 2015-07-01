gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
process = require "child_process"
exec = process.exec
runseq = require "run-sequence"
bs = require "browser-sync"
reload = bs.reload

src = ["src/**/*.js"]
css = ["static/css/**/*"]

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

gulp.task "watch", ["serve"], ->
  gulp.watch [src], ["babel:exec", reload]
  gulp.watch [css], ["exec:index", reload]

gulp.task "babel:watch", ->
  gulp.watch [src], ["babel"]

gulp.task "serve", ->
  bs.init
    server:
      baseDir: ["./docs"]
      directory: true
    notify: false
    host: "localhost"

gulp.task "default", ["exec:index"]
