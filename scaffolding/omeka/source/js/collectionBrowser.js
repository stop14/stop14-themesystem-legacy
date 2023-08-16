`/**
 *  @file collectionBrowser.js
 *
 *  Modifications to the PTD form elements
 *
 */

(function($) {

    $(document).ready(function() {

        // Mobile browse controls

        $('#mobile-filter-button').on('click',_toggleFilterOverlay);
        $('#aside-mobile-close-btn').on('click',_toggleFilterOverlay)
        // @todo: allow users to click off of filter overlay. To do this you must prevent propagation if a user selects a control element via event.stopPropagation()
        /*
        $('aside.search-facets').on('click',function(){
            if (window.outerWidth <= breakpoint_desktop) {
                _toggleFilterOverlay()
            }
        })
        */

        function _toggleFilterOverlay() {
            $('aside.search-facets').slideToggle(window.heartbeat);
            $('.search-results-header').fadeToggle(window.heartbeat).css('display', 'flex');
        }

        // Collection browser support

        var browseViewMode = localStorage.getItem('search_view_type');
        if (browseViewMode !== null) {
            const browserUIbuttons =  $('.search-results-header .search-view-type');
            browserUIbuttons.each(function(){
                // Manage active state classes and icons.
               $(this).removeClass('active');
               $(this).find('img').trigger('switchtoinactive').removeClass('active'); // custom trigger in js/rollover.js

               if ($(this).hasClass('search-view-type-' + browseViewMode)) {
                   $(this).addClass('active');
                   $(this).find('img').trigger('switchtoactive').addClass('active'); // custom trigger in js/rollover.js
               }

               // (Advanced Search Module) browse mode is handled via Javascript. This swaps the icons.

               $(this).on('click',function(e){
                   $(this).find('img').trigger('switchtoactive').addClass('active');
                   $(this).siblings().each(function(){
                       // @todo: img.trigger('switchtoinactive') should work, but it does not.
                       const img = $(this).find('img');
                       img.attr('src',img.attr('data-src'));
                       img.removeClass('active');
                   });
               });
            });
        }


        // Modify browse collection search button to conform to design
        $('#form-search').find('button.search-submit').attr('aria-describedby','Submit search request').html('');


        // Open facet details if an item is checked.

        $('.search-facet details').each(function() {
            var open = false;
            $(this).find('input').each(function() {
               if ($(this).is(':checked')) {
                   open = true;
               }
            });

            if(open === true) {
                $(this).attr('open','');
            }
        })

    });

})(jQuery);
