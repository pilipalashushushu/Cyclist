var gulp = require("gulp");

var cleanCSS = require("gulp-clean-css");

var sass = require("gulp-sass");

var browserSync = require('browser-sync').create();

var reload = browserSync.reload;

//搬家
gulp.task('concat', function () {
    gulp.src('dev/*.html').pipe(gulp.dest('dest/'));
})

gulp.task('concatjs', function () {
    gulp.src('dev/js/*.js').pipe(gulp.dest('dest/js/'));
})
//css轉譯
gulp.task("minicss", function () {

    gulp.task('minicss', function () {

        gulp.src('dev/css/*.css')
            .pipe(cleanCSS({
                compatibility: 'ie8'
            })).pipe(gulp.dest('dest/css/'));

    })

})

//sass 轉譯

gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./dest/css'));
});

//監看
gulp.task('watch', function () {
    gulp.watch('dev/sass/*.scss', ['function']);
});

//html template
var fileinclude = require('gulp-file-include');

gulp.task('template', function () {
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
});



//gulp watch

gulp.task('default', function () {
    browserSync.init({
        server: {
            //根目錄
            baseDir: "./dest",
            index: "index.html"
        }
    });

    gulp.watch(["dev/sass/*.scss", "dev/sass/**/*.scss"], ['sass']).on('change', reload);
    gulp.watch(["dev/*.html", "dev/**/*.html"], ['template']).on('change', reload);
    gulp.watch(["dev/js/*.js"], ['concatjs']).on('change', reload);
});