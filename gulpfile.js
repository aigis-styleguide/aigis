var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var bs = require("browser-sync");
var reload = bs.reload;
var process = require('child_process');
var exec = process.exec;
var src = {
  sass: ['src/sass/*.scss'],
  docs: ['src/template/*.ejs','src/doc/**/*.md', 'src/aigis_config.yml']
};
var dest = {
  css: './src/doc_assets/css',
  doc_css: './docs/doc_assets/css'
};

gulp.task('sass', () => {
  return gulp.src(src.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest.css))
    .pipe(gulp.dest(dest.doc_css));
});

gulp.task('aigis', (cb) => {
  exec('npm run docs', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
});

gulp.task('watch', () => {
  gulp.watch(src.sass, ['sass', reload]);
  gulp.watch(src.docs, ['aigis', reload]);
});

gulp.task('serve', ['watch'], () => {
  bs.init({
    server: {
      baseDir: ['./'],
      directory: false
    },
    notify: false,
    host: 'localhost'
  });
});

gulp.task("default", ["serve"]);
