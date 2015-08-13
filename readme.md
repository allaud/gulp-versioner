Gulp-versioner
=======

Gulp plugin for automatic versioning your scripts

How it works
=======

Having `widget.backfill.js` file we want to store `unstable` file, file with version number etc.

So, with config like this:

    {
      "default": {
        "widget.backfill.js": [
          "widget.backfill.%version%.js",
          "widget.backfill.unstable.js"
        ]
      }
    }

The `gulp-versioner` will create two additional files: `widget.backfill.1.0.0.js` and `widget.backfill.unstable.js`

You can also use different environments to deploy staging, production versions, etc.


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
