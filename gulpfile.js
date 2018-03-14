var     gulp          = require('gulp'),
		gutil         = require('gulp-util'),
		watch         = require('gulp-watch'),
		sass          = require('gulp-sass'),
		imagemin      = require('gulp-imagemin'),
		pngquant      = require('imagemin-pngquant'),
		browserSync   = require('browser-sync'),
		gcmq          = require('gulp-group-css-media-queries'),
		concat        = require('gulp-concat'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rimraf		  = require("rimraf"),
		fileinclude   = require('gulp-file-include'),
		reload		  =	browserSync.reload;

var path = {
    build: {
        html: 'build',
		js: 'build/js',
		css: 'build/css',
		img: 'build/img',
		fonts: 'build/fonts'
    },
	src: {
    	html: 'app/html/*.html',
		js: 'app/js/common.js',
		style: 'app/sass/main.scss',
		img: 'app/img/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	watch: {
    	html: 'app/template/**/*.html',
		js: 'app/js/common.js',
		style: 'app/sass/**/*.scss',
		img: 'app/img/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	clean: './build'
};

gulp.task('fileinclude', function () {
    gulp.src('app/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'app/templates/'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
});


gulp.task('css', function () {
    gulp.src(path.src.style)
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer())
		.pipe(gcmq())
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(browserSync.stream());
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(browserSync.stream());
});
gulp.task('include-watch', ['fileinclude'], reload);

gulp.task('default', ['fileinclude', 'css'], function () {
    // serve files from the build folder
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    // watch files and run tasks
    gulp.watch("app/**/*.html", ['include-watch']);
    gulp.watch("app/sass/**/*.scss", ['css']);
});