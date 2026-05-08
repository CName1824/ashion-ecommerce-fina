
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

    $('.filter-control li').on('click', function () {
        $('.filter-control li').removeClass('active'); // Xóa gạch đỏ ở nút cũ
        $(this).addClass('active'); // Thêm gạch đỏ vào nút vừa bấm
    });
    $('.size-btn label').on('click', function () {
        $('.size-btn label').removeClass('active');
        $(this).addClass('active');
    });
    

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


    $(".product-detail-pic-slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    });
    $('.product-thumb a').on('click', function (e) {
        $('.product-thumb a').removeClass('active');
        $(this).addClass('active');
    });
    var product_slider = $(".product-detail-pic-slider");
    product_slider.on('changed.owl.carousel', function (event) {
        var index = event.item.index;
        var all_thumbs = $('.product-thumb a');
        all_thumbs.removeClass('active');
        all_thumbs.eq(index).addClass('active');
    });
});
