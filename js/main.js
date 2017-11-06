$(document).ready(function() {
  function fixedNavbar() {
    $("#brand-nav").addClass("fixed");
    $("#brand").css("font-size", "50px");
    $("nav ul").css("padding", "10px");
  }
  function normalizeNavbar() {
    $("#brand-nav").removeClass("fixed");
    $("#brand").css("font-size", "80px");
    $("nav ul").css("padding-top", "26px");
  }

  $(window).scroll(function() {
    var releaseNav = true;

    if (releaseNav == true) {
      $("#main a").addClass("colorChange");
      $("#news a").removeClass("colorChange");
      $("#contact a").removeClass("colorChange");
      $("#animation_link a").removeClass("colorChange");
      normalizeNavbar();
    }
    if ($("#second-page").offset().top - $(window).scrollTop() < 100) {
      releaseNav = false;
      fixedNavbar();
      $("#news a").addClass("colorChange");
      $("#main a").removeClass("colorChange");
      $("#animation_link a").removeClass("colorChange");
    }
    // if ( $("#animation").offset().top - $(window).scrollTop() < 200){
    //   releaseNav = false
    //   fixedNavbar();
    //    $("#animation_link a").addClass("colorChange");
    //    $("#main a").removeClass("colorChange");
    //    $("#news a").removeClass("colorChange");
    // }
    if ($("#third-page").offset().top - $(window).scrollTop() < 100) {
      $("#contact a").addClass("colorChange");
      $("#animation_link a").removeClass("colorChange");
      $("#news a").removeClass("colorChange");
    }
  });

  // Smoothit page jumpit
  $("a[href*=#]:not([href=#])").click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") || location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 55
          },
          { duration: 1000, queue: false }
        );
        return false;
      }
    }
  });
});
