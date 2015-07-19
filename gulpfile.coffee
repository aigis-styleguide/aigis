gulp = require "gulp"
mocha = require "gulp-mocha"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
process = require "child_process"
exec = process.exec
runseq = require "run-sequence"
bs = require "browser-sync"
reload = bs.reload
require('intelli-espower-loader')
sass = require "gulp-sass"

src =
  js: ["lib/**/*.js"]
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
  scss: ["theme/**/*.scss"]

name =
  js: "index.js"

index = "./index.js"

gulp.task "scss", ->
  gulp.src src.scss
    .pipe do plumber
    .pipe do sass
    .pipe gulp.dest("./docs/doc_assets/css/")

gulp.task "test", ->
  gulp.src src.tests
    .pipe do plumber
    .pipe do mocha

gulp.task "exec:index", (cb) ->
  exec "node #{index}" , (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb()

gulp.task "watch", ->
  gulp.watch src.js, ["exec:index"]

gulp.task "theme", ["serve"], ->
  gulp.watch src.scss, ["scss", reload]

gulp.task "serve", ->
  bs.init
    server:
      baseDir: ["./docs"]
      directory: true
    notify: false
    host: "localhost"

gulp.task "default", ["exec:index"]
