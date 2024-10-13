/*!
 * Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector("#sideNav");
  if (sideNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

$(document).ready(function() {
    // https://drive.google.com/thumbnail?id=&sz=w1000
    // 讀取JSON文件
    $.getJSON('images.json', function(data) {
        let carouselInner = $('.carousel-inner');
        let carouselIndicators = $('.carousel-indicators');
        let totalImages = data.images.length;
        
        // 動態添加輪播圖項目和指示器
        data.images.forEach((image, index) => {
            let item = $('<div>').addClass('carousel-item');
            if (index === 0) item.addClass('active');
            
            let img = $('<img>')
                .addClass('d-block w-100')
                .attr('src', image.url)
                .attr('alt', '圖片 ' + (index + 1))
                .css('cursor', 'pointer');
            
            item.append(img);
            carouselInner.append(item);

            // 添加指示器
            let indicator = $('<button>')
                .attr('type', 'button')
                .attr('data-bs-target', '#imageCarousel')
                .attr('data-bs-slide-to', index);
            if (index === 0) indicator.addClass('active');
            carouselIndicators.append(indicator);
        });

        // 更新圖片索引顯示
        updateImageIndex(1, totalImages);

        // 點擊圖片時顯示放大版
        $('.carousel-item img').click(function() {
            $('#modalImage').attr('src', $(this).attr('src'));
            $('#imageModal').modal('show');
        });

        // 監聽輪播圖滑動事件
        $('#imageCarousel').on('slid.bs.carousel', function() {
            let currentIndex = $('.carousel-item.active').index() + 1;
            updateImageIndex(currentIndex, totalImages);
        });
    });
});

function updateImageIndex(currentIndex, totalImages) {
    $('#imageIndex').text(currentIndex + ' / ' + totalImages);
}
