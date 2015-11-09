import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('watch.api', function () {
  let instance = nodemon({
    script: './src/api/index.js',
    ext: 'js json',
    legacyWatch: true
  });

  //needed to cancel the application with ctrl+c
  instance.on('exit', function() {
    process.exit(1);
  });

});

gulp.task('default', ['watch.api']);
