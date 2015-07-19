(function($) {
  $(function() {
    var $categories = $("[data-path-root]");
    var roots = _($categories)
      .map(function(category) {
        return $(category).attr("data-path-root");
      })
      .uniq()
      .value();
    
    $categories.each(function() {
      var $this = $(this);
      var root = $this.attr("data-path-root");
      var parent = $this.attr("data-path-parent");
      var name = $this.text();
      var level = $this.attr("data-path-level");
      var query = "[data-path-parent=" + name + "][data-path-root=" + root + "][data-path-level=" + (parseInt(level) + 1)  + "]";
      
      var $btn = $this.find(".opener");
      $btn
        .on("click", function(e) {
        $btn.toggleClass("open");
        e.preventDefault();
        $(query).toggleClass("open");
      });
      
      if ($(query).length !== 0) {
        $this.prepend($btn);
      }
      else {
        $btn.addClass("spacer");
      }
    });
    
    function preOpen() {
      var path = location.pathname.split('/');
      path = _.reject(path, function(path) {
        return path === "" || path === "docs" || path === "category" || path === "index.html";
      });
      
      var root = _.first(path);
      var name = _.last(path);
      var parent = path[path.length -2];
      var level = path.length -1;
      
      $("[data-path-level='0'][data-path-root=" + root + "]")
        .addClass("open");
      
      for(var i = 1; i <= level; i++) {
        var query = "[data-path-level=" + i + "][data-path-root=" + root + "]";
        $(query).addClass("open");
      }
    }
    
    preOpen();
  });
})(jQuery);
