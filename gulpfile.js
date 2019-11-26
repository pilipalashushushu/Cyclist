/**
 * ***************/
/**使用須知**/
/***************
 * 
 * step 0: 執行伺服器環境
 * (把整包放在伺服器的資料夾並執行)
 * IIS -> wwwroot
 * XAMPP -> htdocs
 * 
 * step 1: 初始化npm
 * (抓取package.json的所有套件"dependencies"&"devDependencies")
 * 執行指令
 * npm install
 * !安全版本(F5即時更新)
 * !gulp: 3.9.1
 * !browser-sync: 2.26.5
 * 
 * step 2: 初始化dest
 * (製作dest資料夾並將dev所有檔案搬移&壓縮&編譯)
 * 執行指令
 * gulp copyImg     (images資料夾搬移)
 * gulp copyModel   (model資料夾搬移)
 * gulp copyBackEnd (後端資料夾搬移)
 * gulp copyPhp     (PHP資料夾搬移)
 * gulp minifyJS    (js資料夾搬移&壓縮)
 * gulp sass        (sass編譯&壓縮&建立css資料夾並傳送)
 * gulp template    (html模板編譯&編譯後html搬移)
 * 
 * step 3: 匯入/更新資料庫
 *  3-1. 進入 http://140.115.236.71/phpmyadmin/
 *  3-2. 匯出sql檔
 *  3-3. 使用自己電腦的phpmyadmin匯入(若有舊的資料庫可drop掉在匯入)
 * 
 * step 4: 調整dev/php/connect.php
 *  4-1. 更改 $user 跟 $pw 成自己電腦的資料庫帳號密碼
 * 
 * step 5: 開始Coding
 * (使用gulp指令)
 * 執行指令
 * gulp
 * 
 * (baseDir -> 路徑資料夾)
 * (index -> 預設開啟的html檔案)
 * (watch -> 偵測dev的所有資料夾，有更動就會執行step2的指令)
 * 
 * 
 * ***************/
/**資料夾結構**/
/***************
 * cyclist/
 * |
 * |- package.json      (紀錄已使用的套件)
 * |- package-lock.json (紀錄已使用的套件版本)
 * |- .gitignore        (設定不可add的資料夾&檔案)
 * |
 * |- dev/
 * |    |
 * |    |- admin_template-master/   (後端資料夾)
 * |    |- images/                  (圖片檔資料夾)
 * |    |- js/                      (JavaScript資料夾)
 * |    |- model/                   (3D Model資料夾)
 * |    |- php/                     (PHP資料夾)
 * |    |- sass/                    (scss資料夾)
 * |    |- template/                (html模板資料夾)
 * |    |- *.html                   (主要輸出html檔案)
 * |
 * |- php-7.3.9-nts-Win32-VC15-x64/ (使用php版本)
 *      |
 *      |-tmp/      (session位置)
 *      |-php.ini   (ini設定檔)
 * 
 * ***************/
/**dest資料夾結構**/
/***************
 * dest/
 * |
 * |- admin_template-master/   (後端資料夾)
 * |- css/     (css資料夾)
 * |- images/  (圖片檔資料夾)
 * |- js/      (JavaScript資料夾)
 * |- model/   (3D Model資料夾)
 * |- php/     (PHP資料夾)
 * |- *.html   (主要輸出html檔案)
 * 
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const fileinclude = require('gulp-file-include');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;



gulp.task('copyImg', function(){
    return gulp.src('./dev/images/*')
        .pipe(gulp.dest('./dest/images'))
});

gulp.task('copyModel', function(){
    return gulp.src('./dev/model/*')
        .pipe(gulp.dest('./dest/model'))
});

gulp.task('copyBackEnd', function(){
    return gulp.src(['./dev/admin_template-master/*', './dev/admin_template-master/**/*', './dev/admin_template-master/**/**/*', './dev/admin_template-master/**/**/**/*'])
        .pipe(gulp.dest('./dest/admin_template-master'))
});

gulp.task('copyPhp', function(){
    return gulp.src('./dev/php/*')
        .pipe(gulp.dest('./dest/php'))
});

gulp.task('minifyJS', function(){
    return gulp.src('./dev/js/*.js')
        .pipe(gulp.dest('./dest/js'))
});

gulp.task('sass', function(){
    return gulp.src('./dev/sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dest/css'))
});

gulp.task('template', function(){
    return gulp.src('./dev/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('./dest'))
});

gulp.task('default', function(){
    //不需要就可以註解關掉
    // browserSync.init({
    //     server: {
    //         baseDir: "./dest",
    //         index: "index.html"
    //     }
    // });

    gulp.watch('./dev/img/*', ['copyImg']).on('change', reload);
    gulp.watch('./dev/model/*', ['copyModel']).on('change', reload);
    gulp.watch('./dev/admin_template-master/*', ['copyBackEnd']).on('change', reload);
    gulp.watch('./dev/php/*', ['copyPhp']).on('change', reload);
    gulp.watch('./dev/sass/*.scss', ['sass']).on('change', reload);
    gulp.watch('./dev/js/*.js', ['minifyJS']).on('change', reload);
    gulp.watch('./dev/*.html', ['template']).on('change', reload);
})