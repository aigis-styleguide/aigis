var sassColorJson = require('sass-color-json');

function sassPalette (inputPath) {
  var colorJson = sassColorJson.sync({ input: inputPath });
  var colorKeys = Object.keys(colorJson);
  var colors = [];

  for (var i = 0; i < colorKeys.length; i++) {
    colors.push({
      name: '$' + colorJson[colorKeys[i]].name,
      value: colorJson[colorKeys[i]].type + colorJson[colorKeys[i]].value
    })
  }

  return colors;
}

module.exports = sassPalette;
