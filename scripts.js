$(function () {
    $(".dropdown-menu .dropdown-item").on("click", function (event) {
      event.preventDefault();
      var label = $(this).text().trim();
      $(this).closest(".dropdown").find(".dropdown-toggle span").text(label);

    });

    function loadQuotes() {
      var $inner = $('#carouselExampleControls .carousel-inner');
      $inner.html('<div class="loader"></div>');

      $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function (data) {
          $inner.empty();
          $.each(data, function (i, quote) {
            var active = i === 0 ? 'active' : '';
            var item = '<div class="carousel-item ' + active + '">' +
              '<div class="row mx-auto align-items-center">' +
                '<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">' +
                  '<img src="' + quote.pic_url + '" width="100" height="100" style="object-fit:cover;" class="d-block align-self-center rounded-circle" alt="' + quote.name + '" />' +
                '</div>' +
                '<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">' +
                  '<div class="quote-text">' +
                    '<p class="text-white">' + quote.text + '</p>' +
                                '<h4 class="text-white font-weight-bold">' + quote.name + '</h4>' +
                                '<span class="text-white">' + quote.title + '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
                $inner.append(item);
            });
            $('#carouselExampleControls').carousel();
          }
        });
      }
  loadQuotes();
});