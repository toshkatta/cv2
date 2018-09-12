/*
	Dutchwebworks Gulp boilerplate, dec. 2016
*/

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	src = './src',
	dist = './dist',
	config = {
		htmlPath: dist,
		scssPath: src + '/scss',
		cssPath: dist + '/css',
		imgPathSrc: src + '/images',
		imgPathDest: dist + '/images'
	},
	meta = {
		banner: ['/*!',
			' * Name: <%= pkg.name %>',
			' * Author: <%= pkg.author %>',
			' * Version: <%= pkg.version %>',
			' * Date: ' + formatDate(),
			' */',
			'',
			''].join('\n')
	};

/**********************************************************************
2. Custom functions
**********************************************************************/

// Generate pretty date for banner header in minified files
function formatDate() {
	var today = new Date(),
		month = today.getMonth() + 1,
		day = today.getDate();

	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	return (today.getFullYear() + '-' + month) + '-' + day;
}

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* Sass compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('sass', function () {
	return gulp.src(config.scssPath + '/**/*.scss')
		.pipe(sass({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
		.pipe(gulp.dest(config.cssPath))
		.pipe(browserSync.stream());
});

/* Compile Pug templates
-------------------------------------------------------------------- */

gulp.task('pug', function buildHTML() {
	return gulp.src(src + '/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(dist));
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: dist
		}
	});
});

/**********************************************************************
4. Registered Gulp tasks
**********************************************************************/

gulp.task('build', function () {
	gulp.start('pug');
	gulp.start('sass');
});

gulp.task('serve', ['build', 'browser-sync'], function () {
	gulp.watch(src + '/**/*.pug', ['pug']).on('change', browserSync.reload).on('error', (e) => {
		console.log(e)
		ths.emit('end')
	});
	gulp.watch(config.scssPath + '/**/*.scss', ['sass']).on('change', browserSync.reload).on('error', (e) => {
		console.log(e)
		ths.emit('end')
	});
});

gulp.task('default', ['build']);