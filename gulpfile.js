var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');

gulp.task('restart-server', function () {
  nodemon({
    script: './src/api/index.js',
    ext: 'js json',
    legacyWatch: true
  });
});

gulp.task('default', ['restart-server']);
