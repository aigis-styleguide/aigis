function renderColor(colors) {
  var html = _.map(colors, function(color) {
    return '<div style="background-color:' + color + ';width: 100%; line-height: 40px;text-align: center;margin-bottom: 5px;">' + color + '</div>';
  }).join("\n");
  return html;
}

module.exports = renderColor;
