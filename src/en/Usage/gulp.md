/*
---
name: With gulp
category:
  - Usage
  - Usage/gulp
---

## Installation

```
$ npm install --save-dev gulp-aigis
```

## Run gulp-aigis

```js
var gulp = require('gulp');
var aigis = require('gulp-aigis');

gulp.task('aigis', function() {
  return gulp.src('./path/to/aigis_config.yml')
    .pipe(aigis());
});

```

*/
