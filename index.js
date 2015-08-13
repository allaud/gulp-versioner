var through = require('through2');
var path    = require('path');
var fs      = require('fs');


module.exports = function (options) {
  options = options || {};

  var config  = require(process.cwd() + '/versions.json');
  var package = require(process.cwd() + '/package.json');
  var current_config = config[options.env || 'default'];

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-size', 'Streaming not supported'));
      return;
    }

    var basename = path.basename(file.path);
    var basepath = path.dirname(file.path);

    if(current_config[basename]){
      current_config[basename].forEach(function(filename){
        filename = filename.replace('%version%', package.version);
        fs.writeFile(basepath + '/' + filename, file.contents, function (err) {
          if (err) return console.log(err);
        });
      });
    }

    cb(null, file);

  }, function (cb) {
    cb();
  });
};
