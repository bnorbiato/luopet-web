// -----------------------------------------------------------------------------
// Vars
// -----------------------------------------------------------------------------
const pkg = require("./package.json");
const gulp = require("gulp");

// -----------------------------------------------------------------------------
// Load all plugins in "devDependencies" into the variable $
// -----------------------------------------------------------------------------
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

const onError = (err) => {
    console.log(err);
};

const banner = [
    "/* @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @version         <%= pkg.version %>",
    " * @build          " + $.moment().format("YYYY-MM-DD HH:mm") + "",
    " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
    " */"
].join("\n");


// -----------------------------------------------------------------------------
// scss - build folder
// -----------------------------------------------------------------------------
gulp.task("scss", () => {
    $.fancyLog("-> Compiling scss");
    return gulp.src(pkg.paths.src.styles + pkg.vars.scssName)
        .pipe($.sassGlobImport())
        .pipe($.sass())
        .pipe(gulp.dest(pkg.paths.src.stylesDist));
});

// -----------------------------------------------------------------------------
// css task - combine & minimize any distribution CSS
// -----------------------------------------------------------------------------
gulp.task("css", ["scss"], () => {
    $.fancyLog("-> Building css");
    return gulp.src(pkg.globs.distCss)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.print())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.concat(pkg.vars.siteCssName))
        .pipe($.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.css))
        .pipe($.filter("**/*.css"))
        .pipe($.livereload());
});


// -----------------------------------------------------------------------------
// js task - minimize any distribution Javascript
// -----------------------------------------------------------------------------
gulp.task("js", () => {
    $.fancyLog("-> Building js");
    return gulp.src(pkg.globs.distJs)
        .pipe($.concat(pkg.vars.siteJsName))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.if(["*.js", "!*.min.js"],
            $.uglify()
        ))
        .pipe($.if(["*.js", "!*.min.js"],
            $.rename({suffix: ".min"})
        ))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.js))
        .pipe($.filter("**/*.js"))
        .pipe($.livereload());
});


// -----------------------------------------------------------------------------
// Imagemin task
// -----------------------------------------------------------------------------
gulp.task("imagemin", () => {
    return gulp.src(pkg.paths.src.img + "**/*")
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}],
            verbose: true,
            use: []
        }))
        .pipe(gulp.dest(pkg.paths.build.img));
});


// -----------------------------------------------------------------------------
// Copy fonts
// -----------------------------------------------------------------------------
gulp.task("fonts", () => {
    return gulp.src(pkg.paths.src.fonts + "**/*")
    .pipe(gulp.dest(pkg.paths.build.fonts))
});


// -----------------------------------------------------------------------------
// Generate-fontello task
// -----------------------------------------------------------------------------
gulp.task("fontello", () => {
    return gulp.src(pkg.paths.src.fontello + "config.json")
        .pipe($.fontello())
        .pipe($.print())
        .pipe(gulp.dest(pkg.paths.build.fontello))
});


// -----------------------------------------------------------------------------
// Process data in an array synchronously
// -----------------------------------------------------------------------------
function doSynchronousLoop(data, processData, done) {
    if (data.length > 0) {
        const loop = (data, i, processData, done) => {
            processData(data[i], i, () => {
                if (++i < data.length) {
                    loop(data, i, processData, done);
                } else {
                    done();
                }
            });
        };
        loop(data, 0, processData, done);
    } else {
        done();
    }
}


// -----------------------------------------------------------------------------
// Process the critical path CSS one at a time
// -----------------------------------------------------------------------------
function processCriticalCSS(element, i, callback) {
    const criticalSrc = pkg.criticalUrl + element.url;
    const criticalDest = 'assets/critical/' + element.template + '_critical.min.css';

    $.fancyLog("-> Generating critical CSS: " + $.chalk.cyan(criticalSrc) + " -> " + $.chalk.magenta(criticalDest));
    $.critical.generate({
        src: criticalSrc,
        dest: criticalDest,
        inline: false,
        ignore: [],
        css: [
            pkg.paths.build.css + pkg.vars.siteCssName,
        ],
        minify: true,
        width: 1400,
        height: 1200
    }, (err, output) => {
        if (err) {
            $.fancyLog($.chalk.magenta(err));
        }
        callback();
    });
}


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task("default", ["css", "js", "fonts", "imagemin"]);


// -----------------------------------------------------------------------------
// Default watch
// -----------------------------------------------------------------------------
gulp.task("watch", ["css", "js", "imagemin"], () => {
    $.livereload.listen();
    gulp.watch([pkg.paths.src.styles + "**/*"], ["css"]);
    gulp.watch([pkg.paths.src.js + "**/*"], ["js"]);
    gulp.watch([pkg.paths.src.img + "**/*"], ["imagemin"]);
});


// -----------------------------------------------------------------------------
// Critical css task
// -----------------------------------------------------------------------------
gulp.task("criticalcss", ["css"], (callback) => {
    doSynchronousLoop(pkg.globs.critical, processCriticalCSS, () => {
        callback();
    });
});

