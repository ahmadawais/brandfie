var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size'); //shows the size of the entire project or files
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jade = require('gulp-jade');
var base64 = require('gulp-base64');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//gulp stuff (no watch breaking on errors)
var plumber = require('gulp-plumber');

// css
gulp.task('css', function() {
	gulp.src('src/css/main.scss')
		.pipe(plumber())
		//.pipe(sass({outputStyle: ''})
		.pipe(sass({outputStyle: 'compressed'})
			.on('>>> SASS COMPILING ERROR: ', sass.logError))
		.pipe(base64({
			//baseDir: 'public',
			//extensions: ['svg', 'png', 'svg', /\.jpg#datauri$/i],
			//exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
			//maxImageSize: 8*1024, // bytes
			//debug: true
		}))
		.pipe(autoprefixer({
			browsers: ['> 0%'],
			cascade: false
		}))
		.pipe(size())
		.pipe(gulp.dest('build/css'));
});

// js
gulp.task('main_js', function() {
	gulp.src([
		'bower_components/jQuery/dist/jquery.min.js',
		'bower_components/webfontloader/webfontloader.js',
		'bower_components/filterizr/src/jquery.filterizr.js',
		'bower_components/slick-carousel/slick/slick.min.js',
		'bower_components/lightbox2/src/js/lightbox.js',
		'src/js/main.js'])
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest('build/js'));
});

// Jade
gulp.task('jade', function(){
	gulp.src(['src/templates/**.jade'])
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('build/'));
});

// images
gulp.task('compress_img', function() {
	gulp.src('src/img/**')
		.pipe(imagemin({
				progressive: true,
				optimizationLevel: 1,
				svgoPlugins: [
					{removeViewBox: false},
					{removeDoctype: true},
					{removeComments: true},
					{cleanupNumericValues:
						{floatPrecision: 2}
					},
					{convertColors: {
							names2hex: false,
							rgb2hex: false
						}
					}],
				use: [pngquant()]
			}
		))
		.pipe(gulp.dest('build/img'))
});

gulp.task('dev:watch', function () {
	gulp.watch('src/templates/**', ['jade']),
	gulp.watch('src/css/**', ['css']),
	gulp.watch('src/js/main.js', ['main_js']),
	gulp.watch('src/img/**',['compress_img']);
});

gulp.task('compile', ['css', 'main_js', 'compress_img', 'jade']);
