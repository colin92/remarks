var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  livereload.listen();
  gulp.watch('./assets/stylesheets/**/*.scss', ['processCSS']);
});


gulp.task('processCSS', function() {
  gulp.src('./assets/stylesheets/**/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/'))
    .pipe(livereload());
});
