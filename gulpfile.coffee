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

src =
  js: ["lib/**/*.js"]
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']

name =
  js: "index.js"

index = "./index.js"

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

gulp.task "serve", ->
  bs.init
    server:
      baseDir: ["./docs"]
      directory: true
    notify: false
    host: "localhost"

gulp.task "default", ["exec:index"]
