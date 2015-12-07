var gulp = require("gulp");
var aigis = require("gulp-aigis");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var bs = require("browser-sync");
var reload = bs.reload;

var src = {
  scss: ["src/css/**/*.scss"]
};

gulp.task("watch", ["serve"], function(){
  gulp.watch("./**.html", reload);
  gulp.watch(src.scss, ["scss", reload]);
});

gulp.task("scss", function(){
  return gulp.src("./src/css/app.scss")
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("aigis", function(){
  return gulp.src("./aigis_config.yml")
    .pipe(aigis());
});

gulp.task("serve", function(){
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
