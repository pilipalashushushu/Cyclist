/**
 * ***************//**使用須知**//***************
 * 
 * step 1: 初始化npm
 * (抓取package.json的所有套件"dependencies"&"devDependencies")
 * 執行指令
 * npm install
 * 
 * step 2: 初始化dest
 * (製作dest資料夾並將dev所有檔案搬移&壓縮&編譯)
 * 執行指令
 * gulp copyImg     (images資料夾搬移)
 * gulp copyModel   (model資料夾搬移)
 * gulp minifyJS    (js資料夾搬移&壓縮)
 * gulp sass        (sass編譯&壓縮&建立css資料夾並傳送)
 * gulp template    (html模板編譯&編譯後html搬移)
 * 
 * step 3: 開始Coding
 * (使用gulp指令打開瀏覽器，並且watch資料夾有變更就及時執行指令)
 * 執行指令
 * gulp
 * 
 * (baseDir -> 路徑資料夾)
 * (index -> 預設開啟的html檔案)
 * (watch -> 偵測dev的所有資料夾，有更動就會執行step2的指令)
 * 
 * 
 * ***************//**資料夾結構**//***************
 * cyclist/
 * |
 * |- package.json      (紀錄已使用的套件)
 * |- package-lock.json (紀錄已使用的套件版本)
 * |- .gitignore        (設定不可add的資料夾&檔案)
 * |
 * |- dev/
 *      |
 *      |- images/  (圖片檔資料夾)
 *      |- js/      (JavaScript資料夾)
 *      |- model/   (3D Model資料夾)
 *      |- sass/    (scss資料夾)
 *      |- template/(html模板資料夾)
 *      |- *.html   (主要輸出html檔案)
 * 
 * ***************//**dest資料夾結構**//***************
 * dest/
 * |
 * |- css/     (css資料夾)
 * |- images/  (圖片檔資料夾)
 * |- js/      (JavaScript資料夾)
 * |- model/   (3D Model資料夾)
 * |- *.html   (主要輸出html檔案)
 * 
*/

const gulp = require('gulp');
const copy = require('gulp-copy');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const fileinclude = require('gulp-file-include');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('copyImg', async()=>{
    return gulp.src('./dev/images/*')
        .pipe(gulp.dest('./dest/images'))
});

gulp.task('copyModel', async()=>{
    return gulp.src('./dev/model/*')
        .pipe(gulp.dest('./dest/model'))
});

gulp.task('minifyJS', async()=>{
    return gulp.src('./dev/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('./dest/js'))
});

gulp.task('sass', async()=>{
    return gulp.src('./dev/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dest/css'))
});

gulp.task('template', async()=>{
    return gulp.src('./dev/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('./dest'))
});

gulp.task('default', async()=>{
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "index.html"
        }
    });
    gulp.watch('./dev/img/*', gulp.series('copyImg'));
    gulp.watch('./dev/model/*', gulp.series('copyModel'));
    gulp.watch('./dev/sass/*.scss', gulp.series('sass'));
    gulp.watch('./dev/js/*.js', gulp.series('minifyJS'));
    gulp.watch('./dev/*.html', gulp.series('template'));
});