$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = './index.html';
        return;
    }

    function fetchRelatedProducts(categoryId, currentProductId) {
        $.ajax({
            url: `https://ashion-api.onrender.com/products?categoryId=${categoryId}&_page=1&_limit=4`,
            method: "GET",
            success: function (response) {
                let list = response;

                let filteredList = list.filter(p => p.id !== currentProductId);

                renderRelatedProductsHTML(filteredList);
            },
            error: function (error) {
                console.log("Lỗi không lấy được sản phẩm liên quan", error);
            }
        });
    }
    
    function fetchProductDetail() {
        $.ajax({
            url: `https://ashion-api.onrender.com/products/${productId}`,
            method: "GET",
            success: function (product) {
                renderProductDetail(product);
                fetchRelatedProducts(product.categoryId, product.id);
            },
            error: function (error) {
                console.log("Không tìm thấy sản phẩm này!", error);
                $('#detail-product').html('<h3 class="text-center w-100">Sản phẩm không tồn tại!</h3>');
            }
        });
    }

    fetchProductDetail();

    function renderProductDetail(product) {
        let totalStock = 0;
        let uniqueColors = [];
        let uniqueSizes = [];

        $.each(product.variants, function (index, v) {
            totalStock += v.stock;

            if (!uniqueColors.includes(v.color)) {
                uniqueColors.push(v.color);
            }

            if (!uniqueSizes.includes(v.size)) {
                uniqueSizes.push(v.size);
            }
        });

        let thumbHtml = '';
        let bigImgHtml = '';
        $.each(product.images, function (index, imgObj) {
            thumbHtml += `
        <a class="pt ${index === 0 ? 'active' : ''}" href="#product-${index + 1}">
            <img src="${imgObj.thumb}" alt="thumb">
        </a>
    `;

            bigImgHtml += `
        <img data-hash="product-${index + 1}" class="product__big__img" src="${imgObj.big}" alt="big-img">
    `;
        });

        let colorsHtml = '';
        $.each(uniqueColors, function (index, color) {
            colorsHtml += `
            <label for="${color}">
                <input type="radio" name="color__radio" id="${color}" ${index === 0 ? 'checked' : ''} value="${color}">
                <span class="checkmark" style="background-color: ${color};"></span>
            </label>
        `;
        });

        let sizesHtml = '';
        $.each(uniqueSizes, function (index, size) {
            sizesHtml += `
            <label for="${size}-btn" class="${index === 0 ? 'active' : ''}">
                <input type="radio" id="${size}-btn" name="size__radio" value="${size}" ${index === 0 ? 'checked' : ''}>
                ${size.toUpperCase()}
            </label>
        `;
        });

        let stockHtml = '';
        if (totalStock > 0) {
            stockHtml = `
            <label for="stockin"> In Stock (Còn tổng ${totalStock} sp)
                <input type="checkbox" id="stockin" checked disabled> <span class="checkmark"></span>
            </label>
        `;
        } else {
            stockHtml = `
            <label for="stockin" > Out of Stock (Hết hàng)
                <input type="checkbox" id="stockin" disabled> <span class="checkmark" ></span>
            </label>
        `;
        }

        let priceHtml = `$ ${product.price.toFixed(1)}`;
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += i <= product.rating ? '<i class="fa fa-star"></i> ' : '<i class="fa fa-star-o"></i> ';
        }

        let finalHtml = `
        <div class="col-lg-6">
            <div class="product-detail-pic">
                <div class="product-detail-pic-left product-thumb">${thumbHtml}</div>
                <div class="product-details-slider-content">
                    <div class="product-detail-pic-slider owl-carousel">${bigImgHtml}</div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-detail-text">
                <h3>${product.name} <span>Mã sản phẩm: #${product.id}</span></h3>
                <div class="rating">${starsHtml}</div>
                <div class="product-detail-price">${priceHtml}</div>
                <p>${product.description}</p>
                <div class="product-detail-button">
                    <div class="quantity">
                        <span>Quantity:</span>
                        <div class="pro-qty">
                            <span class="dec qtybtn">-</span>
                            <input type="text" value="1" id="buy-quantity">
                            <span class="inc qtybtn">+</span>
                        </div>
                    </div>
                    <a href="#" class="cart-btn" id="btn-add-to-cart"><span class="icon_bag_alt"></span> Add to cart</a>
                    <ul>
                        <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                        <li><a href="#"><span class="icon_adjust-horiz"></span></a></li>
                    </ul>
                </div>
                <div class="product-detail-widget">
                    <ul>
                        <li><span>Availability:</span> <div class="stock-checkbox">${stockHtml}</div></li>
                        <li><span>Available color:</span> <div class="color-checkbox">${colorsHtml}</div></li>
                        <li><span>Available size:</span> <div class="size-btn">${sizesHtml}</div></li>
                        <li><span>Promotions:</span>
                            <p>Free shipping</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="product-detail-tab">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link p-0 active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                            type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link p-0" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                            type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Specification</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link p-0" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                            type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews ( 2 )</button>
                    </li>
                    
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                        tabindex="0">
                        <h6>Description</h6>
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                            Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                            voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                            consequat massa quis enim.</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem.</p>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                        <h6>Specification</h6>
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                            Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                            voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                            consequat massa quis enim.</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem.</p>
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                        <h6>Reviews ( 2 )</h6>
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                            Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                            voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                            consequat massa quis enim.</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem.</p>
                    </div>
                    
                </div>
            </div>
        </div>
    `;

        $('#detail-product').html(finalHtml);
        initTemplatePlugins();
    }

    function renderRelatedProductsHTML(productsList) {
        let html = '';
        let now = new Date();

        if (!productsList || productsList.length === 0) {
            $('#related-products-list').html('<div class="col-12 text-center"><p style="font-style:italic; color:#888;">Không có sản phẩm liên quan nào.</p></div>');
            return;
        }

        productsList.forEach(function (product) {
            let labelHtml = '';
            let createDay = new Date(product.createdAt);
            let diffDay = Math.trunc((now - createDay) / (1000 * 60 * 60 * 24));

            let totalStock = product.variants.reduce((sum, item) => sum + item.stock, 0);

            if (totalStock <= 0) {
                labelHtml = '<div class="label out-of-stock">out of stock</div>';
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
                starsHtml = '<span style="font-size: 0.8rem; color: #888; font-style: italic;">Chưa có đánh giá</span>';
            } else {
                for (let i = 1; i <= 5; i++) {
                    starsHtml += i <= product.rating ? '<i class="fa fa-star"></i> ' : '<i class="fa fa-star-o"></i> ';
                }
            }

            let cartButtonHtml = totalStock > 0 ? `<li><a href="./shop-cart.html"><span class="icon_bag_alt"></span></a></li>` : ``;
            let mainImage = product.images && product.images.length > 0 ? (product.images[0].big || product.images[0]) : './assets/img/default-placeholder.jpg';

            html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-item ${(product.oldPrice && product.oldPrice > product.price) ? 'p-sale' : ''}">
                    <div class="product-item-pic">
                        <img src="${mainImage}" alt="${product.name}">
                        ${labelHtml}
                        <ul class="product-hover">
                            <li><a href="${mainImage}" class="image-popup"><span class="arrow_expand"></span></a></li>
                            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                            ${cartButtonHtml}
                        </ul>
                    </div>
                    <div class="product-item-text">
                        <h6>
                            <a href="./product-details.html?id=${product.id}">
                                ${product.name}
                            </a>
                        </h6>
                        <div class="rating">${starsHtml}</div>
                        <div class="product-price">${priceHtml}</div>
                    </div>
                </div>
            </div>
        `;
        });

        $('#related-products-list').html(html);
    }
    function initTemplatePlugins() {

        $(document).on('click', '.size-btn label', function () {
            $('.size-btn label').removeClass('active');
            $(this).addClass('active');
        });

        if ($(".product-detail-pic-slider").length > 0) {

            var product_slider = $(".product-detail-pic-slider");

            product_slider.owlCarousel({
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


            $(document).on('click', '.product-thumb a', function (e) {
                $('.product-thumb a').removeClass('active');
                $(this).addClass('active');
            });

            product_slider.on('changed.owl.carousel', function (event) {
                var index = event.item.index;
                var all_thumbs = $('.product-thumb a');
                all_thumbs.removeClass('active');
                all_thumbs.eq(index).addClass('active');
            });
        }
    }
});