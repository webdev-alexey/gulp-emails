const { src, dest, series, watch } = require("gulp");
const typografHtml = require("gulp-typograf");
const del = require("del");
const browserSync = require("browser-sync").create();
const inlineCss = require("gulp-inline-css");
const fileInclude = require("gulp-file-include");

// del
const clean = () => {
  return del(["build/*"]);
};

// typograf
const html = () => {
  return src([`./src/*.html`])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(
      typografHtml({
        locale: ["ru", "en-US"],
      })
    )
    .pipe(inlineCss())
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
};

// watching
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });

  watch("./src/**/*.html", html);
};

exports.default = series(clean, html, watchFiles);
exports.build = series(clean, html);
