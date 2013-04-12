/**
 * @author      Junio Vitorino
 * @date        July, 11 2011
 * @name        vslider
 * @description Minimalist vertical content slider
 **/

(function(jQuery) {

  jQuery.fn.vslider = function(options, easing) {

    var settings = {
      bounds     : 342,
      upButton   : jQuery('.up'),
      downButton : jQuery('.down'),
      toEach     : 3,
      rewind     : false,
      startAt    : 0
    };

    if(options) jQuery.extend(settings, options);

    var container   = jQuery(this);
    var childHeight = container.children().eq(0).outerHeight(true);
    var bounds      = settings.bounds;
    var slideMax    = Math.round(container.height() - bounds);
    var upButton    = settings.upButton;
    var toEach      = settings.toEach;
    var downButton  = settings.downButton;
    var mask        = $("<div class='mask' />");
    var rewind      = settings.rewind;
    var startAt     = settings.startAt;
    var numChilds   = container.children().size();
    var scrolled    = toEach;

    mask.css( { height : bounds, overflow : 'hidden', position : 'relative' } );
    container.wrap(mask);
    container.css('position', 'relative');

    if(startAt != 0) {
      var currentTop = container.css('top') != 'auto' ? parseInt(container.css('top')) : 0;
      var amount     = currentTop - (childHeight * startAt);
      if(scrolled < numChilds){
        container.animate( { top: amount }, easing )
        scrolled = parseInt(scrolled) + parseInt(startAt);
      }
    }

    downButton.on('click', function(event) {
      container.stop(true, true);
      var currentTop = container.css('top') != 'auto' ? parseInt(container.css('top')) : 0;
      var amount = currentTop - (childHeight * toEach);
      if(amount > -slideMax) {
        container.animate( { top: amount } , easing );
        scrolled += toEach;
      } else if(scrolled < numChilds){
        var value = currentTop - (childHeight * toEach);
        container.animate( { top: value }, easing )
        scrolled += toEach;
      } else {
        if(rewind) {
          container.animate( { top: 0 } , easing );
          scrolled = toEach;
        }
      }
      event.preventDefault();
    });

    upButton.on('click', function(event) {
      container.stop(true, true);
      var currentTop = parseInt(container.css('top'));
      var amount = currentTop + (childHeight * toEach);
      if(currentTop < 0 && scrolled > (toEach * 2)) {
        container.animate( { top: amount }, easing );
        scrolled -= toEach;
      } else {
        var uscrolled = scrolled - toEach;
        container.animate( { top: 0 }, easing );
        scrolled -= uscrolled;
      }
      event.preventDefault();
    });
    return this;
  }
})(jQuery);
