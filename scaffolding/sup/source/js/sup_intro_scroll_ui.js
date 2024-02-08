$(document).ready(function() {


  // For fixed height designs give the body class a mode='fixed-height' attribute OR set the second term here to true

  const smoothScrollActive = $('body').attr('mode') === 'fixed-height' || false;
  const intro = document.getElementById("introduction");

  if (typeof intro === "object" && intro !== null) {
    if (smoothScrollActive) {
      setIntroUI();
    } else {
      function hideIntroUI() {
        $('#introduction-ui-top, #introduction-ui-bottom').hide();
        $(intro).removeClass('scrollable-content');
      }

      hideIntroUI();

    }
  }

});




function setIntroUI() {

  let intro = document.getElementById("introduction"),
   down_btn = $("#down_btn"),
   up_btn = $("#up_btn");

  if (typeof intro === "object" && intro !== null) {

    $(intro).css("overflow-y", "scroll");
    let frame = intro.getBoundingClientRect(),
     fpframe = intro.firstElementChild.getBoundingClientRect(),
     lpframe = intro.lastElementChild.getBoundingClientRect();


    //if (lpframe.bottom < frame.bottom) {
      // $(intro).height(lpframe.bottom - frame.top);
    // }

    up_btn.hide();
    down_btn.hide();

    $(intro)
      .off("scroll")
      .on("scroll", function() {

        fpframe = intro.firstElementChild.getBoundingClientRect();
        lpframe = intro.lastElementChild.getBoundingClientRect();

        if (lpframe.bottom >= frame.bottom) {

          down_btn.fadeIn(200);
          $(intro).addClass('down');

        } else {

          down_btn.fadeOut(200);
          $(intro).removeClass('down');

        }

        if (frame.top > fpframe.top) {
          up_btn.fadeIn(200);
          $(intro).addClass('up');

        } else {
          up_btn.fadeOut(200);
          $(intro).removeClass('up');
        }

      });

    // Perform initial settings.

    $(intro).trigger("scroll");

    down_btn
      .off("click mouseenter mouseleave")
      .on("click", function() {

        $(intro).animate({
          "scrollTop": intro.scrollTop + frame.height
        });

})
      .on("mouseenter", function() {

        let img = $(this).find("img");
        if (img.length > 0) {

          img.attr("src", img.attr("src").replace("down_button_up", "down_button_over"));

}

})
      .on("mouseleave", function() {

        let img = $(this).find("img");
        if (img.length > 0) {

          img.attr("src", img.attr("src").replace("down_button_over", "down_button_up"));

}

});

    up_btn
      .off("click mouseenter mouseleave")
      .on("click", function() {

        $(intro).animate({
          "scrollTop": intro.scrollTop - frame.height
        });

})
      .on("mouseenter", function() {

        let img = $(this).find("img");
        if (img.length > 0) {

          img.attr("src", img.attr("src").replace("up_button_up", "up_button_over"));

}

})
      .on("mouseleave", function() {

        let img = $(this).find("img");
        if (img.length > 0) {

          img.attr("src", img.attr("src").replace("up_button_over", "up_button_up"));

}

});

}

}

window.addEventListener("resize", jQuery.debounce(250,setIntroUI));

