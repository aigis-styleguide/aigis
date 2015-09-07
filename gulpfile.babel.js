'use strict';

const gulp = require("gulp");
const aigis = require("gulp-aigis");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const bs = require("browser-sync");
const reload = bs.reload;

const src = {
  scss: ["src/css/**/*.scss"]
};

gulp.task("watch", ["serve"], () => {
  gulp.watch("./**.html", reload);
  gulp.watch(src.scss, ["scss", reload]);
});

gulp.task("scss", () =>{
  return gulp.src("./src/css/app.scss")
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("aigis", () => {
  return gulp.src("./aigis_config.yml")
    .pipe(aigis());
});

gulp.task("serve", () => {
  bs.init({
    server: {
      index: "./index.html",
      baseDir: ["./"],
      directory: false
    },
    notify: false,
    host: "localhost"
  });
});

gulp.task("default", ["scss"]);
