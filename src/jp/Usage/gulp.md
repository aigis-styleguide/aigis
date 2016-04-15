/*
---
name: gulpで利用する
category:
  - Usage
  - Usage/gulp
---

## インストール

```
$ npm install --save-dev gulp-aigis
```

## gulp-aigisを実行する

```js
var gulp = require('gulp');
var aigis = require('gulp-aigis');

gulp.task('aigis', function() {
  return gulp.src('./path/to/aigis_config.yml')
    .pipe(aigis());
});

```

*/
