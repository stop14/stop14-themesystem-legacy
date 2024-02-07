(function ($, Drupal, once) {

  Drupal.behaviors.overlayMenu = {
    attach: function (context, settings) {

      const elements = once('menu-overlay','.menu-button',context);

      elements.forEach(function (element) {
        const overlay = $('#overlay');
        const menuButton = $(element);

        if (overlay.length > 0) {
          menuButton.on('click',function(){
            overlay.slideToggle(window.animation.heartbeat);
          })
        }

        const overlayContainer = overlay.find('.tier-container');
        overlayContainer
          .css('cursor','pointer')
          .on('click',function(){
            overlay.slideUp(window.animation.heartbeat);
          });

      });
    }
  };
})(jQuery, Drupal, once);
