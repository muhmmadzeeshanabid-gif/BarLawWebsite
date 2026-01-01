$(document).ready(function () {
  $(".blog-card").each(function (index) {
    var card = $(this);
    setTimeout(function () {
      card.addClass("visible");
    }, 200 * index);
  });

  $(window).on("scroll", function () {
    $(".blog-card").each(function () {
      var cardTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > cardTop + 100) {
        $(this).addClass("visible");
      }
    });
  });

  function adjustHeights() {
    $(".blog-card[data-card='first'], .blog-card[data-card='second']").css(
      "height",
      "390px"
    );
    $(".blog-card[data-card='third']").css("height", "550px");
  }

  adjustHeights();
  $(window).resize(adjustHeights);
});
