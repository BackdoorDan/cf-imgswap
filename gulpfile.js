var gulp = require("gulp");
var gutil = require("gulp-util");
var babel = require('gulp-babel');
var livereload = require("gulp-livereload");
var qunit = require('node-qunit-phantomjs');

gulp.task('js', function(){
   
   return gulp.src('es6/cf-imgswap.js')
   .pipe(babel({
      presets: ['es2015']
   }))
   .pipe(gulp.dest('dist'));

});



gulp.task("watch", function () {
    livereload.listen();

    gulp.watch([
        "es6/**/*.js",
        "**/*.html",
    ], function (event) {
        livereload.changed(event);
    });

});


gulp.task('test', function(){
   qunit('./test/test.html', {verbose: true});
});

gulp.task("default", ["js", "watch"]);
