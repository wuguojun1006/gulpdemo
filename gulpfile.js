var gulp = require("gulp"),
    uglify = require('gulp-uglify'), //压缩js
    sass = require("gulp-sass"), //编译sass
    autoprefix = require("gulp-autoprefixer"), //添加前缀
    rev = require("gulp-rev"), //添加版本号防止缓存
    revCollector = require("gulp-rev-collector"), //html路径替换
    clean = require("gulp-clean-css"), //css压缩
    plumber = require('gulp-plumber'), //出错不中断
    imagemin = require('gulp-imagemin'), //图片压缩
    del = require("del"); //文件删除 

gulp.task("sass",function(){
    return gulp.src("src/scss/*/*.scss")
        .pipe(autoprefix())
        .pipe(plumber())
        .pipe(sass())
        .pipe(clean())
        .pipe(rev())
        .pipe(gulp.dest("dis/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dis/rev/css"))
});

gulp.task("script",function(){
    return gulp.src("src/js/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("dis/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dis/rev/js"))
});

gulp.task("image",function(){
    return gulp.src("src/img/*.*")
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest("dis/img"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dis/rev/img"))
});

gulp.task("rev",function(){
    return gulp.src(["dis/**/*.json","src/html/*/*.html"])
        .pipe(revCollector())
        .pipe(gulp.dest("dis/html"))
});

gulp.task('delCSS', function () {
    return del([
      'dis/css/*/*.css'
    ]);
});

gulp.task('delJS', function () {
    return del([
      'dis/js/*.js'
    ]);
});

gulp.task('delImg', function () {
    return del([
      'dis/img/*.*'
    ]);
});

gulp.task("watch",function(){
    gulp.watch("src/img/*.*",["image","delImg"]);
    gulp.watch("src/js/*.js",["script","delJS"]);
    gulp.watch("src/scss/*/*.scss",["sass","delCSS"]);
    gulp.watch(["dis/rev/**/*.json","src/html/*/*.html"],["rev"]);
});

gulp.task("default",["sass","rev","script","image"]);