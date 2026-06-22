$(function () {
    $(".dropdown-menu .dropdown-item").on("click", function (event) {
        event.preventDefault();
        var label = $(this).text().trim();
        $(this).closest(".dropdown").find(".dropdown-toggle span").text(label);
    });

    function loadQuotes() {
        var $inner = $('#carouselExampleControls .carousel-inner');
        $inner.html('<div class="d-flex justify-content-center align-items-center" style="min-height:200px;"><div class="loader"></div></div>');

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

    function makeVideoCard(video) {
        var stars = '';
        for (var s = 1; s <= 5; s++) {
            stars += '<img src="images/' + (s <= video.star ? 'star_on' : 'star_off') + '.png" alt="star" width="15px" />';
        }
        return '<div class="col-12 col-sm-6 col-lg-3">' +
            '<div class="card">' +
            '<img src="' + video.thumb_url + '" class="card-img-top" alt="' + video.title + '" />' +
            '<div class="card-img-overlay text-center">' +
            '<img src="images/play.png" alt="Play" width="64px" class="play-overlay" /></div>' +
            '<div class="card-body">' +
            '<h5 class="card-title font-weight-bold">' + video.title + '</h5>' +
            '<p class="card-text text-muted">' + (video.sub_title || '') + '</p>' +
            '<div class="creator d-flex align-items-center">' +
            '<img src="' + video.author_pic_url + '" alt="Creator" width="30px" class="rounded-circle" />' +
            '<h6 class="pl-3 m-0 main-color">' + video.author + '</h6></div>' +
            '<div class="info pt-3 d-flex justify-content-between">' +
            '<div class="rating">' + stars + '</div>' +
            '<span class="main-color">' + video.duration + '</span></div>' +
            '</div></div>' +
        '</div>';
    }

    function loadVideoCarousel(url, carouselId) {
        var $carousel = $('#' + carouselId);
        var $inner = $carousel.find('.carousel-inner');
        $inner.html('<div class="d-flex justify-content-center align-items-center" style="min-height:200px;"><div class="loader"></div></div>');

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                $inner.empty();
                var visible = 4;
                var numItems = data.length <= visible ? 1 : data.length - visible + 1;

                for (var i = 0; i < numItems; i++) {
                    var active = i === 0 ? ' active' : '';
                    var item = '<div class="carousel-item' + active + '"><div class="row justify-content-center no-gutters">';
                    for (var j = i; j < i + visible && j < data.length; j++) {
                        item += makeVideoCard(data[j]);
                    }
                    item += '</div></div>';
                    $inner.append(item);
                }
                $carousel.carousel();
            }
        });
    }

    loadVideoCarousel('https://smileschool-api.hbtn.info/popular-tutorials', 'carouselExampleControls2');
    loadVideoCarousel('https://smileschool-api.hbtn.info/latest-videos', 'carouselExampleControls3');
    loadQuotes();

    function loadCourses() {
        var $container = $('.courses-container');
        $container.html('<div class="d-flex justify-content-center align-items-center w-100" style="min-height:200px;"><div class="loader"></div></div>');

        var q = $('.search-text-area').val() || '';
        var topic = $('.box2 .dropdown-toggle span').text().trim();
        var sort = $('.box3 .dropdown-toggle span').text().trim();

        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            method: 'GET',
            data: { q: q, topic: topic, sort: sort },
            success: function (data) {
                $('.video-count').text(data.courses.length + ' videos');
                $container.empty();
                $.each(data.courses, function (i, video) {
                    var stars = '';
                    for (var s = 1; s <= 5; s++) {
                        stars += '<img src="images/' + (s <= video.star ? 'star_on' : 'star_off') + '.png" alt="star" width="15px" />';
                    }
                    var card = '<div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">' +
                        '<div class="card">' +
                        '<img src="' + video.thumb_url + '" class="card-img-top" alt="Video thumbnail" />' +
                        '<div class="card-img-overlay text-center">' +
                        '<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" /></div>' +
                        '<div class="card-body">' +
                        '<h5 class="card-title font-weight-bold">' + video.title + '</h5>' +
                        '<p class="card-text text-muted">' + (video['sub-title'] || '') + '</p>' +
                        '<div class="creator d-flex align-items-center">' +
                        '<img src="' + video.author_pic_url + '" alt="Creator" width="30px" class="rounded-circle" />' +
                        '<h6 class="pl-3 m-0 main-color">' + video.author + '</h6></div>' +
                        '<div class="info pt-3 d-flex justify-content-between">' +
                        '<div class="rating">' + stars + '</div>' +
                        '<span class="main-color">' + video.duration + '</span></div>' +
                        '</div></div>' +
                    '</div>';
                    $container.append(card);
                });
            }
        });
    }

    if ($('.courses-container').length) {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            method: 'GET',
            success: function (data) {
                var $topicMenu = $('.box2 .dropdown-menu');
                $topicMenu.empty();
                $.each(data.topics, function (i, topic) {
                    $topicMenu.append('<a class="dropdown-item" href="#">' + topic + '</a>');
                });
                if (data.topics.length) {
                    $('.box2 .dropdown-toggle span').text(data.topics[0]);
                }

                var $sortMenu = $('.box3 .dropdown-menu');
                $sortMenu.empty();
                $.each(data.sorts, function (i, sort) {
                    $sortMenu.append('<a class="dropdown-item" href="#">' + sort + '</a>');
                });
                if (data.sorts.length) {
                    $('.box3 .dropdown-toggle span').text(data.sorts[0]);
                }

                $('.search-text-area').val(data.q || '');
                loadCourses();
            }
        });

        $('.search-text-area').on('input', loadCourses);

        $(document).on('click', '.box2 .dropdown-item', function (e) {
            e.preventDefault();
            $('.box2 .dropdown-toggle span').text($(this).text().trim());
            loadCourses();
        });

        $(document).on('click', '.box3 .dropdown-item', function (e) {
            e.preventDefault();
            $('.box3 .dropdown-toggle span').text($(this).text().trim());
            loadCourses();
        });
    }
});
