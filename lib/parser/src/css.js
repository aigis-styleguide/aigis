var path = require('path');
var _ = require('lodash');
var regex_comment = /\/\*(\*(?!\/)|[^*])*\*\//g;
var regex_config = /-{3}[\s\S]+?-{3}/;
var YAML = require('js-yaml');


/*
* 対象ファイルからコメントブロックを抜き出す
* --- で始まる設定部分の記述がない場合には無視する
* */
function css(files) {
  var ret = _(files)
    .map(function(file) {
      var contents = file.contents.toString();
      var comments = contents.match(regex_comment);

      comments = _.map(comments, function(comment) {
        var fb = comment.indexOf('\n');
        var lb = comment.lastIndexOf('\*\/');
        return comment.substr(fb + 1, lb - (fb + 1));
      });

      var parsedComments = _.map(comments, function(comment) {
        var config;
        var matched = comment.match(regex_config);

        if (matched === null) return;

        // --- で囲まれている部分を抜き出す
        var configStr = matched[0].replace(/-{3}/g, '');

        try {
          config = YAML.load(configStr);
        }
        catch(e) {
          throw new Error(e);
        }

        config.category = config.category === undefined ? [] : config.category;
        config.tag = config.tag === undefined ? [] : config.tag;

        // config.category & config.tag must be Array.
        config.category = !_.isArray(config.category) ? [config.category] : config.category;
        config.tag = !_.isArray(config.tag) ? [config.tag] : config.tag;

        return {
          config: config,
          md: comment.replace(regex_config, ''),
          source: file.path,
          sourcePath: '/' + path.relative('./', file.path)
        }
      });

      return parsedComments;

    })
    .flatten()
    .compact()
    .value();

  return ret;
}

module.exports = css;
