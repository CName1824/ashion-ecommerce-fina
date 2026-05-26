
$(document).ready(function () {

    function createProductCard(product) {

        let labelHtml = '';
        const diffDays = Math.ceil(Math.abs(new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24));

        if (product.stock <= 0) {
            labelHtml = '<div class="label out-of-stock">out of stock</div>';
        } else if (diffDays <= 5) {
            labelHtml = '<div class="label new">new</div>';
        } else if (product.oldPrice && product.oldPrice > product.price) {
            labelHtml = '<div class="label sale">sale</div>';
        }


        const mainImage = (product.images && product.images.length > 0)
            ? product.images[0]
            : './assets/img/default-placeholder.jpg';

        // 3. TỰ ĐỘNG XỬ LÝ GIÁ TIỀN VÀ KHUYẾN MÃI (CHỐNG RÁC)
        let priceHtml = `$ ${product.price.toFixed(1)}`;
        if (product.oldPrice && product.oldPrice > product.price) {
            priceHtml += ` <span>$ ${product.oldPrice.toFixed(1)}</span>`;
        }


        let starsHtml = '';
        if (!product.rating || product.rating === 0) {
            starsHtml = '<span style="font-size: 1.2rem; color: #888; font-style: italic;">Chưa có đánh giá</span>';
        } else {
            for (let i = 1; i <= 5; i++) {
                starsHtml += i <= product.rating ? '<i class="fa fa-star"></i> ' : '<i class="fa fa-star-o"></i> ';
            }
        }

        // 5. ẨN/HIỆN NÚT MUA HÀNG DỰA VÀO STOCK
        let cartButtonHtml = product.stock > 0
            ? `<li><a href="./shop-cart.html" class="add-to-cart-btn"><span class="icon_bag_alt"></span></a></li>`
            : ``;


        return `
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
                        <a href="./product-details.html?id=${product.id}" style="color: #111111; text-decoration: none;">
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
    }

    // 1. Tạo một cái kho tạm (Biến toàn cục) để lưu mảng sản phẩm
    let allProducts = [];

    // 2. Hàm vẽ giao diện (Chỉ làm đúng 1 việc là sinh ra HTML)
    function renderProducts(productsToRender) {
        const container = document.getElementById("product-list");
        if (!container) return;
        // Xử lý góc khuất: Lỡ danh mục đó không có sản phẩm nào thì sao?
        if (productsToRender.length === 0) {
            container.innerHTML = '<h5 class="text-center w-100 mt-5">Rất tiếc, chưa có sản phẩm nào trong danh mục này!</h5>';
            return;
        }

        let finalHtml = "";
        productsToRender.forEach(product => {
            finalHtml += createProductCard(product); // Gọi khuôn đúc đã viết ở bài trước
        });
        container.innerHTML = finalHtml;
    }

    function loadProducts() {
        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(products => {
                allProducts = products; // Cất dữ liệu vào kho tạm
                renderProducts(allProducts); // Vẽ toàn bộ sản phẩm ra màn hình lần đầu
            })
            .catch(error => console.error("Lỗi:", error));
    }

    loadProducts(); // Kích hoạt chạy



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

    function loadCategories() {
        fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(categories => {
                // ==========================================
                // 1. ĐỔ DỮ LIỆU THANH ĐIỀU HƯỚNG (FILTER NAV)
                // ==========================================
                const filterNav = document.getElementById("filter-nav");
                if (!filterNav) return;

                
                let navHtml = '<li class="active" data-category="all">All</li>';

                categories.forEach(cat => {
                    const shortName = cat.name.split(" ")[0];
                    navHtml += `<li data-category="${cat.id}">${shortName}</li>`;
                });
                filterNav.innerHTML = navHtml;

                // ==========================================
                // 2. ĐỔ DỮ LIỆU BANNER (HERO ASYMMETRICAL)
                // ==========================================
                const heroGrid = document.getElementById("hero-grid");
                if (categories.length > 0) {
                    const mainCat = categories[0];

                    const subCats = categories.slice(1, 5);

                    let subCatsHtml = '';
                    subCats.forEach(cat => {
                        subCatsHtml += `
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="hero-item set-bg">
                                <img src="${cat.image}" alt="${cat.name}" class="bg">
                                <div class="hero-text">
                                    <h4>${cat.name}</h4>
                                    <p>${cat.itemCount} items</p>
                                    <a href="#">Shop now</a>
                                </div>
                            </div>
                        </div>
                    `;
                    });

                    heroGrid.innerHTML = `
                    <div class="col-lg-6">
                        <div class="hero-item hero-item-large">
                            <img src="${mainCat.image}" alt="${mainCat.name}" class="bg">
                            <div class="hero-text">
                                <h1>${mainCat.name}</h1>
                                <p>${mainCat.description}</p>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row gx-3">
                            ${subCatsHtml}
                        </div>
                    </div>
                `;
                }
            })
            .catch(error => console.error("Lỗi lấy danh mục:", error));
    }

    loadCategories();
    $(document).on('click', '#filter-nav li', function () {
        $('#filter-nav li').removeClass('active');
        $(this).addClass('active');


        const clickedCategoryId = $(this).attr('data-category');

        // 3. Bắt đầu bộ lọc
        if (clickedCategoryId === 'all') {
            renderProducts(allProducts);
        } else {
            
            const filteredProducts = allProducts.filter(product => product.categoryId == clickedCategoryId);
            renderProducts(filteredProducts);
        }
    });
    // ==========================================
    // 5. ĐỔ DỮ LIỆU SẢN PHẨM LIÊN QUAN (TRANG CHI TIẾT)
    // ==========================================
    function loadRelatedProducts() {
        const relatedContainer = document.getElementById("related-product-list");

       
        if (!relatedContainer) return;

        const urlParams = new URLSearchParams(window.location.search);
        const currentProductId = urlParams.get('id');

        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(products => {
                // 1. Lọc bỏ chính cái sản phẩm đang xem ra khỏi danh sách
                let filteredProducts = products.filter(product => product.id != currentProductId);

                // 2. Cắt lấy đúng 4 sản phẩm đầu tiên để làm "Sản phẩm liên quan"
                let relatedProducts = filteredProducts.slice(0, 4);

                // 3. Tái sử dụng khuôn đúc createProductCard
                let finalHtml = "";
                relatedProducts.forEach(product => {
                    finalHtml += createProductCard(product);
                });

                // 4. Đổ ra màn hình
                relatedContainer.innerHTML = finalHtml;
            })
            .catch(error => console.error("Lỗi tải sản phẩm liên quan:", error));
    }

    
    loadRelatedProducts();
});
