
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
        // 1. Vòng lặp: Nếu để 'true', khi đến ảnh cuối nó sẽ quay lại ảnh đầu. 
        // Ở đây để 'false' nghĩa là đến ảnh cuối cùng sẽ dừng lại.
        loop: false,

        // 2. Khoảng cách giữa các ảnh: 0 pixel (các ảnh nằm sát nhau).
        margin: 0,

        // 3. Số lượng ảnh hiển thị cùng một lúc trên màn hình: 1 ảnh.
        items: 1,

        // 4. Các chấm tròn nhỏ ở dưới slide: 'false' là ẩn chúng đi.
        dots: false,

        // 5. Thanh điều hướng (Nút Next/Prev): 'true' là hiển thị hai nút mũi tên.
        nav: true,

        // 6. Nội dung hiển thị trong nút điều hướng: 
        // Ở đây bạn đang dùng icon mũi tên từ thư viện Elegant Icons.
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],

        // 7. Tốc độ chuyển ảnh: 1200ms (tương đương 1.2 giây), giúp hiệu ứng mượt mà hơn.
        smartSpeed: 1200,

        // 8. Tự động thay đổi chiều cao slide theo ảnh: 
        // 'false' nghĩa là các ảnh nên có cùng kích thước để slider ổn định.
        autoHeight: false,

        // 9. Tự động chạy slide: 'false' là người dùng phải tự bấm mới chuyển ảnh.
        autoplay: false,

        // 10. Kéo bằng chuột: 'false' là khóa tính năng dùng chuột vuốt/kéo ảnh.
        mouseDrag: false,

        // 11. Vị trí bắt đầu của slide dựa trên URL: 
        // Thường dùng khi bạn click vào ảnh nhỏ (Thumbnail) có gắn mã ID (#) 
        // thì ảnh to tương ứng sẽ hiện lên ngay lập tức.
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
