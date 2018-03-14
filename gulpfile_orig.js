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

//
// var config = {
//     server: {
//         baseDir: "./build"
//     },
// //    tunnel: true,
// //    host: 'localhost',
// //    port: 8080,
// };

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});
gulp.task('html:build', function () {
	gulp.src('app/html/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'app/templates/'
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream());
});
gulp.task('include-watch', ['html:build'], reload);

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer())
		.pipe(gcmq())
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest(path.build.css)) //И в build
        //.pipe(reload( {stream: true} ))
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
        .pipe(reload({stream: true}));
});

// gulp.task('sass', function() {
// 	return gulp.src('app/sass/**/*.sass')
// 	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
// 	.pipe(rename({ suffix: '.min', prefix : '' }))
// 	.pipe(autoprefixer(['last 15 versions']))
// 	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload( {stream: true} ))
// });
//
// gulp.task('js', function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/js/common.js', // Always at the end
// 		])
// 	//.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Mifify js (opt.)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({ stream: true }))
// });
//
// gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// 	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
// 	gulp.watch('app/*.html', browserSync.reload)
// });
//
// gulp.task('default', ['watch']);
gulp.task('build', [
    'html:build',
    //'js:build',
    'style:build',
    //'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){

    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch(['app/**/*'], reload);
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    // watch([path.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    gulp.watch("*.html", ['include-watch']);
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build','watch', 'browser-sync']);