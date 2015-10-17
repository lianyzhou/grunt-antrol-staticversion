/*
 * grunt-antrol-staticversion
 *
 * Copyright (c) 2015 lianyzhou
 */

module.exports = function(grunt) {

  //查找后缀名
  function findExtFiles(entryPath) {
    var map = {};
    grunt.file.recurse(entryPath , function(abspath, rootdir, subdir, filename) {
      if(/\./.test(filename)) {
        var ext = filename.split(/\./).pop();
        map[ext] = 1;
      }
    });
    return Object.keys(map);
  }

  //构建正则表达式
  function buildRegExp(pathPre , exts) {

    var part1 = pathPre.replace(/\//g , "\\/");
    var part2 = '[a-z0-9._\\-\\/]+';
    var part3 = '\\.(?:' + exts.join('|') + ')';

    /**
     * \\?ow7eix
     * \\?#iefixow7eix
     * ?ow7eix#icomoon
     */

    var part4 = '(\\?ow7eix|\\?#iefixow7eix|\\?ow7eix#icomoon)?';

    return new RegExp("(" + part1 + part2 + part3 + ")" + part4 , 'gi');

  }


  grunt.registerMultiTask('staticversion', 'add static version for static files.', function() {

    var options = this.options({
      staticDir : "public",
      pathPre : "/resources/",
      staticVersion : new Date().getTime()
    });


    var exts = findExtFiles(options.staticDir);

    var regexp = buildRegExp(options.pathPre , exts);

    /**
     *
     普通情况：[ '/resources/fonts/icomoon.ttf?ow7eix',
     '/resources/fonts/icomoon.ttf',
     '?ow7eix']

     字体文件情况：[ '/resources/vendors/jquery/jquery.min.js',
     '/resources/vendors/jquery/jquery.min.js',
     undefined]
     */


    this.files.forEach(function(obj) {
      var fileContent = grunt.file.read(obj.src);
      fileContent = fileContent.replace(regexp , function(full,resourcePath,icomoonPart) {
        if(icomoonPart) {
            if(icomoonPart.indexOf('?ow7eix') >= 0) {
              return resourcePath + icomoonPart.replace('?ow7eix' , '?' + options.staticVersion);
            } else {
              return full;
            }
        } else {
          return full + "?v=" + options.staticVersion;
        }
      });
      grunt.file.write(obj.dest , fileContent);
    });

  });
};
