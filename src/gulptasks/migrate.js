import gulp from 'gulp';
import { up, down, dropTables } from '../shared/utils/migrate';

gulp.task('migrate.up', function () {
  return up();
});

gulp.task('migrate.down', function () {
  return down();
});

gulp.task('migrate.dropTables', function () {
  return dropTables();
});
