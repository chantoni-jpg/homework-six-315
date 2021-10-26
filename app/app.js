$(document).ready(function () {
  initListeners();
});

function initListeners() {
  let displayCount = 0;

  $(".fa-bars").click(function () {
    if (displayCount == 0) {
      $(".mobile-links").css("display", "flex");
      displayCount = 1;
    } else {
      $(".mobile-links").css("display", "none");
      displayCount = 0;
    }
  });
}
