var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'), //png图片压缩插件
  tinypng = require('gulp-tinypng-compress'),
  concat = require('gulp-concat'),
  injectStr = require('gulp-inject-string'),
  filePath = require("../config.js"),
  pageConfig = require(filePath.pageConfig),
  artTemplate = require("gulp-art-template4");
    //引入文件路径配置
var filePath = require("../config.js");

gulp.task('uglify-js', function() {
  return gulp.src([filePath.JSPath + '/*.js',filePath.modulesPath+"/*.js"])
  .pipe(concat("index.js"))
  // .pipe(uglify())//不需要压缩请注释掉本行
  .pipe(rename({
    basename:'index',
    suffix: '.min'
  }))
  .pipe(gulp.dest(filePath.publicPath + "/js/"))

});
gulp.task('uglify-css', function() {
  return gulp.src([filePath.CSSPath + '/*.css',filePath.modulesPath+"/*.css"])
  .pipe(concat("index.css"))
  .pipe(cleanCss())//不需要压缩请注释掉本行
  .pipe(rename({
    basename:'index',
    suffix: '.min'
  }))
  .pipe(gulp.dest(filePath.publicPath + "/css/"))
});

gulp.task('renders', function() {
  return gulp.src([filePath.CSSPath + '/*.css',filePath.modulesPath+"/*.css"])
  .pipe(concat("index.css"))
  .pipe(cleanCss())//不需要压缩请注释掉本行
  .pipe(rename({
    basename:'index',
    suffix: '.min'
  }))
  .pipe(gulp.dest(filePath.publicPath + "/css/"))
});


gulp.task('compress-img', function() {
  return gulp.src(filePath.IMGPath + "/*")
  .pipe(tinypng({
      key: '0XHvqwY7DaNks2UFbAOR7wh4KLns_hbV',
      sigFile: '',
      log: true
    }))
  .pipe(gulp.dest(filePath.publicPath + "/img/"))
});

//artTemplate后端渲染

gulp.task('render-html', function() {
  return gulp.src(filePath.basePath+"/*.art")
  .pipe(artTemplate({
    title:pageConfig["title"],
    resbase:pageConfig["publish"]
  }))
  .pipe(rename("index.html"))
  .pipe(injectStr.replace('./app/resourse/img/', pageConfig["publish"]+'/img/'))
  .pipe(injectStr.replace('<!-- inject:css -->', '<link rel="stylesheet" href="'+pageConfig["publish"]+'/css/index.min.css">'))
  .pipe(injectStr.replace('<!-- inject:js -->',  '<script type="text/javascript" src="'+pageConfig["publish"]+'/js/index.min.js"></script>'))
  .pipe(gulp.dest(filePath.publicPath))
});
gulp.task('build-task', ['render-html','uglify-js','uglify-css','compress-img']);
gulp.task('build-test-task', ['uglify-js', 'uglify-css']);
