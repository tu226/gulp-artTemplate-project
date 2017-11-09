var gulp = require('gulp'),
    path=require('path'),
  babel = require('gulp-babel'),
  rollup = require("gulp-rollup"),
  concat = require('gulp-concat'),
  rename = require("gulp-rename"),
  inject = require('gulp-inject'),
  injectStr = require('gulp-inject-string'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  autoprefixer = require("gulp-autoprefixer"),
  sass = require('gulp-sass'),
  cssimport = require("gulp-cssimport"),
  filePath = require("../config.js"),
  urlAdjuster = require('gulp-css-url-adjuster'),
  gutil = require('gulp-util'),
  pageConfig = require(filePath.pageConfig),
  artTemplate = require("gulp-art-template4");

//所有js，css加载
const jsArr=[],cssArr=[];
pageConfig["require"].map(function(item,index){
  jsArr.push(path.resolve(__dirname,"../common/components/"+item+"/script.js"));
  cssArr.push(path.resolve(__dirname,"../common/components/"+item+"/style.scss"));
})

//artTemplate后端渲染
gulp.task('art-render', function() {
  return gulp.src(filePath.basePath+"/*.art")
  .pipe(artTemplate({
    title:pageConfig["title"]
  }))
  .pipe(rename("index.html"))
  .pipe(injectStr.replace('<!-- inject:css -->', '<link rel="stylesheet" href="./app/modules/style.css">\n<link rel="stylesheet" href="./app/resourse/css/index.css">\n'))
  .pipe(injectStr.replace('<!-- inject:js -->',  '<script type="text/javascript" src="./app/modules/script.js"></script>\n<script type="text/javascript" src="./app/resourse/js/index.js"></script>'))
  .pipe(gulp.dest(filePath.basePath))
});



//css文件组装
gulp.task('concat-sass', function() {
  return gulp.src(cssArr)
  .pipe(concat('style.scss'))
  .pipe(cssimport({}))
  .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [
      'last 2 versions', 'Android >= 4.0'
    ],
    cascade: true, //是否美化属性值 默认：true 像这样：
    //-webkit-transform: rotate(45deg);
    //        transform: rotate(45deg);
    remove: true //是否去掉不必要的前缀 默认：true
  }))
  .pipe(rename("style.css"))
  .pipe(gulp.dest(filePath.modulesPath))
  .pipe(reload({stream: true}));
});

//主逻辑css文件监听
gulp.task('watch-index-sass', function() {
  return gulp.src(filePath.CSSPath + '/*.scss')
  .pipe(cssimport({}))
  .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [
      'last 2 versions', 'Android >= 4.0'
    ],
    cascade: true, //是否美化属性值 默认：true 像这样：
    //-webkit-transform: rotate(45deg);
    //        transform: rotate(45deg);
    remove: true //是否去掉不必要的前缀 默认：true
  }))
  .pipe(rename("index.css"))
  .pipe(gulp.dest(filePath.CSSPath))
  .pipe(reload({stream: true}));
});

//js文件组装
gulp.task('concat-js', function() {
  return gulp.src(jsArr)
 .pipe(babel())
 .pipe(concat('script.js'))
 .pipe(gulp.dest(filePath.modulesPath))
});

//主逻辑js文件监听
// gulp.task('watch-index-js', function() {
//   return gulp.src(filePath.JSPath + '/*.js')
//   .pipe(babel())
//   .pipe(rename('index.js'))
//   .pipe(gulp.dest(filePath.JSPath))
// });

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('watch-js', browserSync.reload);

// 静态服务器 + 监听 scss/html 文件
var port=8000;
gulp.task('watch-build-task', ['art-render','concat-js','concat-sass'], function() {
  browserSync.init({
    port: port,
    server: {
      baseDir: filePath.basePath
    }
  });
  gulp.watch([filePath.entry, filePath.JSPath + '/*.js'], ['watch-js']);
  gulp.watch([filePath.CSSPath + '/*.scss'], ['watch-index-sass']);
  gulp.watch(['*.art', filePath.basePath + '/*.art'],['art-render']);
  gulp.watch(['*.html', filePath.HTMLPath + '/*.html']).on('change', reload);
  gulp.watch([path.resolve(__dirname,"../common/components/**/*.scss")],['concat-sass',browserSync.reload]);
  gulp.watch([path.resolve(__dirname,"../common/components/**/*.js")],['concat-js',browserSync.reload]);
  gulp.watch([path.resolve(__dirname,"../common/components/**/*.art")],['art-render']);
});
