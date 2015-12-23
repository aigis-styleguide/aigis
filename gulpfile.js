var gulp = require("gulp");
var espower = require('gulp-espower');
var mocha   = require('gulp-mocha');
var plumber = require("gulp-plumber");
var process = require("child_process");
var exec = process.exec;
var bs = require("browser-sync");
var reload = bs.reload;

var src = {
  js: ["lib/**/*.js"],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

var index = "./bin/aigis";

gulp.task("exec:index", function(cb) {
  exec("node " + index , function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
});

gulp.task("watch",function() {
  return gulp.watch(src.js, ["exec:index"]);
});

gulp.task('test', function() {
  gulp.src([
      'test/**/*.js',
      '!test/test_assets/**'
    ])
    .pipe(espower())
    .pipe(mocha());
});

gulp.task("serve", function() {
  bs.init({
    server: {
      baseDir: ["./docs"],
      directory: true
    },
    notify: false,
    host: "localhost"
  });
});

gulp.task("default", ["exec:index"]);
