Gulp-versioner
=======

Gulp plugin for automatic versioning your scripts

Config
=======

Create file `versions.json` in the project root directory.
You can also use `%version%` tag - it will be replaced by your version taken from `package.json` file.

Example file:

    {
      "default": {
        "widget.backfill.js": [
          "widget.backfill.%version%.js",
          "widget.backfill.unstable.js"
        ],
        "widget.backfill.loader.js": [
          "widget.backfill.loader.%version%.js",
          "widget.backfill.loader.unstable.js"
        ]
      }
    }

Environments
=======

You can use different environments (default is `default`). If you have `production` environment use:

    versionify = require "gulp-versioner"

    gulp.task "versionify", ->
      gulp.src(['tmp/build/*.js'])
        .pipe versionify({env: argv.env})
        .pipe gulp.dest('tmp/build')
