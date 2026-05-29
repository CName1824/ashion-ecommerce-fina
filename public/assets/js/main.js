
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

    
    $('.size-btn label').on('click', function () {
        $('.size-btn label').removeClass('active');
        $(this).addClass('active');
    });
    

    $(".qtybtn").on("click", function () {
        let qty = $(this).siblings("input").val() ? Number($(this).siblings("input").val()) : 0;
        let newQty = 0;
        
        if ($(this).hasClass("inc")) {
            newQty = qty < 1 ? 1 : qty + 1;
        } else {
            newQty = qty < 1 ? 0 : qty - 1;
        }

        $(this).siblings("input").val(newQty);
    });

    $(".pro-qty input").on("keyup", function () {
        let qty = Number($(this).val());
        let newQty = qty ? qty : 1;
        $(this).val(newQty);
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

   

    function renderProductsHTML(productsList) {
        let html = '';
        let now = new Date();

        productsList.forEach(function (product) {
            let labelHtml = '';
            let createDay = new Date(product.createdAt);
            let diffDay = Math.trunc((now - createDay) / (1000 * 60 * 60 * 24));

            if (product.quantity <= 0) {
                labelHtml = '<div class="label out-of-stock" style="background: #111111; color: #fff;">out of stock</div>';
            } else if (diffDay <= 15) {
                labelHtml = '<div class="label new">new</div>';
            } else if (product.oldPrice && product.oldPrice > product.price) {
                labelHtml = '<div class="label sale">sale</div>';
            }

            let priceHtml = `$ ${product.price.toFixed(1)}`;
            if (product.oldPrice && product.oldPrice > product.price) {
                priceHtml += ` <span>$ ${product.oldPrice.toFixed(1)}</span>`;
            }

            let starsHtml = '';
            if (!product.rating || product.rating === 0) {
                starsHtml = '<span style="font-size: 0.9rem; color: #888; font-style: italic;">Chưa có đánh giá</span>';
            } else {
                for (let i = 1; i <= 5; i++) {
                    starsHtml += i <= product.rating ? '<i class="fa fa-star"></i> ' : '<i class="fa fa-star-o"></i> ';
                }
            }

            let cartButtonHtml = product.quantity > 0
                ? `<li><a href="./shop-cart.html" class="add-to-cart-btn"><span class="icon_bag_alt"></span></a></li>`
                : ``;

            
            html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-item ${(product.oldPrice && product.oldPrice > product.price) ? 'p-sale' : ''}">
                    <div class="product-item-pic">
                        <img src="${product.images}" alt="${product.name}">
                        ${labelHtml}
                        <ul class="product-hover">
                            <li><a href="${product.images}" class="image-popup"><span class="arrow_expand"></span></a></li>
                            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                            ${cartButtonHtml}
                        </ul>
                    </div>
                    <div class="product-item-text">
                        <h6>
                            <a href="./product-details.html?id=${product.id}" >
                                ${product.name}
                            </a>
                        </h6>
                        <div class="rating">
                            ${starsHtml}
                        </div>
                        <div class="product-price">
                            ${priceHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
        });
        $('#product-list').html(html);
    }
  

    function callProductsAPI() {
        $.ajax({
            url: "/products",
            method: "GET",
            success: function (data) {
                renderProductsHTML(data);
            },
            error: function (error) {
                console.log("Lỗi khi lấy dữ liệu");
            }
        });
    }

    callProductsAPI();

    function renderCategori(categoriList) {

        const catLarge = categoriList[0];
        let leftHtml = `
        <div class="col-lg-6">
            <div class="hero-item hero-item-large">
                <img src="${catLarge.image || './assets/img/default.jpg'}" alt="ct1" class="bg">
                <div class="hero-text">
                    <h1>${catLarge.name}</h1>
                    <p>${catLarge.description || 'Sitamet, consectetur adipiscing elit...'}</p>
                    <a href="./shop.html?category=${catLarge.id}">Shop now</a>
                </div>
            </div>
        </div>
    `;


        let rightHtml = `<div class="col-lg-6"><div class="row gx-3">`;

        for (let i = 1; i < categoriList.length; i++) {
            let catSmall = categoriList[i];

            rightHtml += `
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="hero-item set-bg">
                    <img src="${catSmall.image || './assets/img/default.jpg'}" alt="ct${i + 1}" class="bg">
                    <div class="hero-text">
                        <h4>${catSmall.name}</h4>
                        <p>${catSmall.itemCount || 0} items</p>
                        <a href="./shop.html?category=${catSmall.id}">Shop now</a>
                    </div>
                </div>
            </div>
        `;
        }

        rightHtml += `</div></div>`;

        let finalHtml = leftHtml + rightHtml;
        $('#hero-grid').html(finalHtml);
    }

    function callCategorisAPI() {
        $.ajax({
            url : "/categories",
            method : "GET",
            success: function (data) {
                renderCategori(data);
            },
            error: function (error) {
                console.log("Lỗi khi lấy dữ liệu", error)
            }
        });
    }
    callCategorisAPI();

    
    

});
