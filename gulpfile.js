var gulp = require("gulp");
var gutil = require("gulp-util");
var babel = require('gulp-babel');
var livereload = require("gulp-livereload");
var qunit = require('node-qunit-phantomjs');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


var jsFiles = [
  'es6/cf-imgswap.js'
];

gulp.task('js', function(){
   
   gulp.src(jsFiles)
   .pipe(babel({
      presets: ['es2015'],
      plugins: ["transform-object-assign"]
   }))
   .pipe(gulp.dest('dist'));
  
  
   gulp.src(jsFiles)
   .pipe(babel({
      presets: ['es2015'],
      plugins: ["transform-object-assign"]
   }))
   .pipe(uglify())
   .pipe(rename("cf-imgswap.min.js"))
   .pipe(gulp.dest('dist'));

});



gulp.task("watch", function () {
    livereload.listen();

    gulp.watch([
        "es6/**/*.js",
        "**/*.html",
    ], ['js']);

});


gulp.task('test', function(){
   qunit('./test/test.html', {
     verbose: true
   });
});

gulp.task("default", ["js", "watch"]);
