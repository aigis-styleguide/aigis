var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var bs = require("browser-sync");
var reload = bs.reload;
var process = require('child_process');
var exec = process.exec;

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

gulp.task('aigis', (cb) => {
  exec('npm run aigis', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
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
