(function jq ($) {

  $(document).ready(function dr() {

      const activeArea = $('main > aside');
      const quotations = $('#quotations');
      const slides = quotations.children();
      quotations.find(':first-child').addClass('current');
      setInterval(_rotateSlides,window.animation.slideTransition);

      // Create pagination

      var pagination = $("<ul>").addClass('pagination');

      // Stop transition when user hovers over the active area

      activeArea.bind('mouseenter',function() {
        quotations.addClass('paused');
      });

      activeArea.bind('mouseleave',function() {
        quotations.removeClass('paused');
      });

      // Track height of slides
      var containerHeight = 0;

      slides.each((i,o) => {
        // Create markers for each page
        $(o).attr('data-index',i);
        let quoteNumber = i + 1;
        let marker = $('<span>').addClass('screen-reader-only').text("View quotation " + quoteNumber);
        let page = $('<li>').attr('data-index',i).append(marker);

        _updateContainerHeight()

        // Transition to slide when user clicks pagination marker

        page.on('click',function transitionPage() {
          var pageIndex =  $(this).attr('data-index');
          quotations.children('.current').removeClass('current');
          quotations.find('[data-index="' +  pageIndex + '"]').addClass('current');
          _updateMarker(pageIndex);
        });

        pagination.append(page);
      });

      pagination.find('[data-index="0"]').addClass('active');

      // Add pagination
      quotations.after(pagination);

      // Set height to tallest slide

      function _updateContainerHeight() {
        slides.each((i,o) => {
          // Update containerHeight if slide is taller. This works because the slide is suppressed using opacity rather than display: none (which would return 0 as a height)
          let slideHeight = $(o).innerHeight();
          containerHeight = slideHeight > containerHeight ? slideHeight : containerHeight;
          quotations.height(containerHeight);
        });
      }

      // Update on resize

      window.addEventListener("resize",jQuery.debounce(250,_updateContainerHeight));

      // Updates the pagination markers

      function _updateMarker(pageIndex) {
        pagination.children('.active').removeClass('active');
        pagination.children('[data-index="' + pageIndex + '"]').addClass('active');
      }

    // Rotate slides on an interval

      function _rotateSlides() {

        const paused = quotations.hasClass('paused') ? true : false;

        if (paused !== true) {
          var curSlide = quotations.find('.current');
          curSlide.removeClass('current');
          nextSlide = curSlide.next().length > 0 ? curSlide.next() : quotations.find(':first-child');
          nextSlide.addClass('current');

          // Update marker
          _updateMarker(nextSlide.attr("data-index"));
        }
      };

        /*
        var curIndex = quotations.index('.current') + 1
        var newIndex = curIndex > slides.length ? 0 : curIndex;
        var nthChild = newIndex + 1;
        console.log("New Interval");
        console.log(curIndex);
        quotations.find('.current').removeClass('current');
        quotations.find(":nth-child(" + nthChild + ")").addClass('current');
         */



      /*
      $(this).slick({
        "fade": true,
        "arrows": false,
        "dots": true,
        "autoplay": true,
        "slidesToShow": 1,
        "slidesToScroll": 1
      });
      */

  });

}(jQuery));
