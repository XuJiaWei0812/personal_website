/* ===================================
優化後的 JavaScript 代碼
=================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupSmoothScrolling();
  setupNavbarEffects();
  setupPortfolioAnimation();
  setupFocusHandling();
  setupActiveNavHighlight();
});

/* ===================================
1. 平滑滾動功能
=================================== */
/* ===================================
1. 平滑滾動功能 (修改後)
=================================== */
/* ===================================
1. 平滑滾動功能 (修正閃爍問題)
=================================== */
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  // 預先獲取 Bootstrap Collapse 實例，並設定 toggle 為 false
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
    toggle: false,
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // 將捲動邏輯包裝成一個函式，以便後續調用
      const scrollToAction = () => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const topPosition = targetSection.offsetTop - 80;
          window.scrollTo({
            top: topPosition,
            behavior: "smooth",
          });
        }
      };

      // 判斷手機版選單是否為展開狀態
      if (navbarCollapse.classList.contains("show")) {
        // 【核心修改】
        // 監聽 Bootstrap 的 'hidden.bs.collapse' 事件
        // 這個事件會在收合動畫「完成後」觸發
        // { once: true } 確保這個監聽器只會執行一次，避免重複觸發
        navbarCollapse.addEventListener("hidden.bs.collapse", scrollToAction, {
          once: true,
        });

        // 觸發收合
        bsCollapse.hide();
      } else {
        // 如果選單本來就是收合的（電腦版），直接捲動
        scrollToAction();
      }
    });
  });

  // 處理 Logo 和 Home 按鈕的點擊事件，使其回到頂部
  const homeLinks = document.querySelectorAll(
    'a[href="#"], a[href="#home"], .navbar-brand'
  );
  homeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // 如果選單是開的，一樣要關閉
      if (navbarCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });
}

/* ===================================
2. 導覽列效果
=================================== */
function setupNavbarEffects() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      navbar.style.backgroundColor = "rgba(52, 58, 64, 0.8)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.backgroundColor = "rgba(52, 58, 64, 0.2)";
      navbar.style.backdropFilter = "none";
    }
  });
}

/* ===================================
3. 作品集動畫
=================================== */
function setupPortfolioAnimation() {
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  // 初始化卡片狀態
  portfolioCards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
  });

  function checkCardsInView() {
    portfolioCards.forEach(function (card) {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", checkCardsInView);
  checkCardsInView();
}

/* ===================================
4. 焦點處理
=================================== */
function setupFocusHandling() {
  const clickableElements = document.querySelectorAll("a, button, [tabindex]");

  clickableElements.forEach(function (element) {
    element.addEventListener("mousedown", function () {
      this.style.outline = "none";
    });

    element.addEventListener("mouseup", function () {
      this.blur();
      this.style.outline = "";
    });

    element.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        this.style.outline = "";
      }
    });
  });
}

/* ===================================
5. 導覽選單滾動高亮
=================================== */
function setupActiveNavHighlight() {
  new bootstrap.ScrollSpy(document.body, {
    target: ".navbar-nav",
    rootMargin: "0px 0px -40%",
  });
}

/* ===================================
6. 頁面載入效果
=================================== */
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease";
});

/* ===================================
7. 返回頂部功能
=================================== */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
