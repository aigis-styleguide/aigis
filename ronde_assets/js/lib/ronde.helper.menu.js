+(function($) {
  var path = location.pathname;
  var folder = location.pathname.split('/');
  var file = folder.splice(-1);
  folder = folder.join('/');
  
  $(".ronde-categoryList__item").each(function() {
    var href = $(this).attr("href");
    href = href.replace("./", "/");
    
    console.log(folder + href);
    if (path === folder + href) {
      $(this).addClass("ronde-categoryList__item--selected");
    }
  })
})(jQuery);
