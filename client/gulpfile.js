var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('serve', function() {

    browserSync({
            server: {
                baseDir: "./"
            }
        }),

        gulp.watch(['*.html', 'Public/css/**/*.css', 'Public/js/**/*.js', 'Angular/**/*.js', 'Angular/**/*.html', 'Views/*.html'], reload);

});