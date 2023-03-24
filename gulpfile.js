const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  }
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
