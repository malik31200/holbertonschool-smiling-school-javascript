$(function () {
    $(".dropdown-menu .dropdown-item").on("click", function (event) {
      event.preventDefault();
      var label = $(this).text().trim();
      $(this).closest(".dropdown").find(".dropdown-toggle span").text(label);

    });
});