((function () {
  var d = document;
  d.write(
    '&#60;!DOCTYPE html>' +
    '&#60;html>' +
      '&#60;head>' +
        '&#60;meta charset=&#34;UTF-8&#34;>' +
        '&#60;title>'+d.title+' - Responsive test &#60;/title>' +
        '&#60;link rel=&#34;stylesheet&#34; href=&#34;https://raw.github.com/christiannaths/responsive-bookmarklet/master/assets/css/app.css&#34;>' +
        '&#60;script src=&#34;https://raw.github.com/christiannaths/responsive-bookmarklet/master/assets/js/app.js&#34;>&#60;/script>' +
      '&#60;/head>' +
      '&#60;body>' +
        '&#60;header>' +
          '&#60;div class=&#34;close&#34;>' +
            '&#60;a href=&#34;#&#34;>&times;&#60;/a>' +
          '&#60;/div>' +
          '&#60;div id=&#34;size&#34;>&#60;/div>' +
          '&#60;div class=&#34;keyboard&#34;>' +
            '&#60;a href=&#34;#&#34;>I&#60;/a>' +
          '&#60;/div>' +
          '&#60;div class=&#34;cssrefresh&#34;>' +
            '&#60;a href=&#34;#&#34;>I&#60;/a>' +
          '&#60;/div>' +
          '&#60;div class=&#34;reloadiframe&#34;>' +
            '&#60;a href=&#34;#&#34;>I&#60;/a>' +
          '&#60;/div>' +
          '&#60;div id=&#34;devices&#34;>' +
            '&#60;a href=&#34;#&#34; class=&#34;tablet-portrait&#34;>' +
              '&#60;span>Tablet Portrait&#60;/span>' +
            '&#60;/a>' +
            '&#60;a href=&#34;#&#34; class=&#34;tablet-landscape&#34;>' +
              '&#60;span>Tablet Landscape&#60;/span>' +
            '&#60;/a>' +
            '&#60;a href=&#34;#&#34; class=&#34;smartphone-landscape&#34;>' +
              '&#60;span>iPhone Landscape&#60;/span>' +
            '&#60;/a>' +
            '&#60;a href=&#34;#&#34; class=&#34;smartphone-portrait&#34;>' +
              '&#60;span>iPhone Portrait&#60;/span>' +
            '&#60;/a>' +
            '&#60;a href=&#34;#&#34; class=&#34;auto active&#34;>' +
              '&#60;span>Auto&#60;/span>' +
            '&#60;/a>' +
          '&#60;/div>' +
        '&#60;/header>' +
        '&#60;section>' +
          '&#60;div id=&#34;wrapper&#34;>' +
            '&#60;iframe src=&#34;'+d.URL+'&#34; onLoad=&#34;resbook.changeUrl(this.contentWindow.location,this.contentDocument.title);&#34;>&#60;/iframe>' +
          '&#60;span class=&#34;keyboard-bg&#34;>&#60;/span>' +
          '&#60;/div>' +
        '&#60;/section>' +
      '&#60;/body>' +
    '&#60;/html>'
  );
})());
