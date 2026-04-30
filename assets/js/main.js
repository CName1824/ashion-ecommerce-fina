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
$('.size-btn label').on('click', function () {
    $('.size-btn label').removeClass('active');
    $(this).addClass('active');
})

    var proQty = $('.pro-qty');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
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