var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var bs = require("browser-sync");
var reload = bs.reload;
var process = require('child_process');
var exec = process.exec;
var src = {
  sass: ['src/sass/*.scss'],
  docs_jp: ['src/template/*.ejs','src/jp/**/*.md', 'src/aigis_config_jp.yml'],
  docs_en: ['src/template/*.ejs','src/en/**/*.md', 'src/aigis_config_en.yml']
};
var dest = {
  css: './src/doc_assets/css',
  doc_en: './docs/en/doc_assets/css',
  doc_jp: './docs/jp/doc_assets/css'
};

gulp.task('sass', () => {
  return gulp.src(src.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest.css))
    .pipe(gulp.dest(dest.doc_jp))
    .pipe(gulp.dest(dest.doc_en));
});

gulp.task('aigis_en', (cb) => {
  exec('npm run docs_en', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
});
gulp.task('aigis_jp', (cb) => {
  exec('npm run docs_jp', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
});

gulp.task('watch', (cb) => {
  gulp.watch(src.sass, ['sass', reload]);
  gulp.watch(src.docs_jp, ['aigis_jp', reload]);
  gulp.watch(src.docs_en, ['aigis_en', reload]);
  cb();
});

gulp.task('serve', ['watch'], function() {
  bs.init({
    server: {
      directory: false
    },
    notify: false,
    host: 'localhost'
  });
});

gulp.task("default", ["serve"]);
