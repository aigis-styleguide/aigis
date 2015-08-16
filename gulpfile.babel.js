'use strict';

const gulp = require("gulp");
const mocha = require("gulp-mocha");
const plumber = require("gulp-plumber");
const process = require("child_process");
const exec = process.exec;
const bs = require("browser-sync");
const reload = bs.reload;
require('intelli-espower-loader');

const src = {
  js: ["lib/**/*.js"],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

const index = "./bin/aigis";

gulp.task("test", () => {
  gulp.src(src.tests)
    .pipe(plumber())
    .pipe(mocha());
});

gulp.task("exec:index", (cb) => {
  exec(`node ${index}` , (err, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  cb();
  });
});

gulp.task("watch", () => {
  gulp.watch(src.js, ["exec:index"]);
});

gulp.task("serve", () => {
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
