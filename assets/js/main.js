$('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
});

$('.filter-control li').on('click', function () {
    $('.filter-control li').removeClass('active'); // Xóa gạch đỏ ở nút cũ
    $(this).addClass('active'); // Thêm gạch đỏ vào nút vừa bấm
});
$(document).ready(function () {
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    var bannerSlider = $(".banner_slider");

    bannerSlider.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        dots: true,
        nav: false,
    });
});