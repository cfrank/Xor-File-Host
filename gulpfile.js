'use strict';

let gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    babel = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

const production = false;
const source_dir = 'assets/source';
const build_dir = 'assets/build';
/* Output file names */
const JS_BUILD_NAME = 'build.js';
const CSS_BUILD_NAME = 'build.css';
/* Output style for sass */
let sass_output_style = (production === false) ? 'expanded' : 'compressed';

let source_path = {
    typescript : source_dir + '/js/**/*.ts', // Typescript files
    babel_dir : source_dir + '/babel/', // ES6 files directory
    babel_source : source_dir + '/babel/main.js', // Main js file
    sass :  source_dir + '/css/**/*.scss' // Sass files
};

/* Transcompiled directory */
let build_path = {
    javascript : build_dir + '/js/',
    css : build_dir + '/css/'
};

gulp.task('typescript:es6', function()
{
    return gulp.src(source_path.typescript)
        .pipe(typescript({
            'module': 'es6',
            'target': 'es6',
            'noImplicitAny': true,
            'suppressImplicitAnyIndexErrors': true
        }))
        .pipe(gulp.dest(source_path.babel_dir));
});

gulp.task('typescript:babel', function()
{
    var watcher = watchify(
        browserify({
            entries: source_path.babel_source,
            debug: true,
            extensions: [' ', 'js']
        }).transform(babel)
    );

    function bundle_es6_files(){
        watcher.bundle()
            .on('error', function(error){
                console.log(error);
                console.log('There has been an error!');
                this.emit('end');
            })
            .pipe(source(JS_BUILD_NAME))
            .pipe(buffer())
            //.pipe(uglify())
            .pipe(gulp.dest(build_path.javascript));
    }

    watcher.on('update', function(){
        console.log('-> bundling... <-');
        bundle_es6_files();
    });
    bundle_es6_files();
}); 

gulp.task('sass', function()
{
    return gulp
        .src(source_path.sass)
        .pipe(sass({outputStyle: sass_output_style}).on('error', sass.logError))
        .pipe(rename(CSS_BUILD_NAME))
        .pipe(gulp.dest(build_path.css));
});

gulp.task('watch', function()
{
    /* Typescript */
    gulp.watch(source_path.typescript, ['typescript:es6']);
    /* Sass */
    gulp.watch(source_path.sass, ['sass']);
});

gulp.task('default', ['typescript:es6', 'typescript:babel', 'sass', 'watch']);