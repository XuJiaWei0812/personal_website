/* ===================================
   簡單易懂的 JavaScript 代碼
   =================================== */

// 等待頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 平滑滾動功能
    setupSmoothScrolling();
    
    // 2. 導覽列效果
    setupNavbarEffects();
    
    // 3. 作品集動畫
    setupPortfolioAnimation();
    
    // 4. 社群連結效果
    setupSocialEffects();
});

/* ===================================
   1. 平滑滾動功能
   =================================== */
function setupSmoothScrolling() {
    // 找到所有導覽連結
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // 為每個連結添加點擊事件
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止預設跳轉
            
            // 取得要跳轉的區塊
            const targetId = link.getAttribute('href'); // 例如: "#about"
            const targetSection = document.querySelector(targetId); // 找到 id="about" 的元素
            
            if (targetSection) {
                // 計算要滾動的位置 (減去導覽列高度 80px)
                const topPosition = targetSection.offsetTop - 80;
                
                // 平滑滾動到目標位置
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   2. 導覽列效果
   =================================== */
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    // 監聽滾動事件
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY; // 取得滾動位置
        
        // 如果滾動超過 50px，改變導覽列背景
        if (scrollPosition > 50) {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)'; // 較不透明
            navbar.style.backdropFilter = 'blur(10px)'; // 模糊效果
        } else {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.8)'; // 較透明
            navbar.style.backdropFilter = 'none'; // 移除模糊
        }
    });
}

/* ===================================
   3. 作品集動畫
   =================================== */
function setupPortfolioAnimation() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    // 先讓所有卡片隱藏
    portfolioCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)'; // 向下移動 30px
        card.style.transition = 'all 0.6s ease'; // 設定動畫時間
    });
    
    // 檢查卡片是否出現在畫面中
    function checkCardsInView() {
        portfolioCards.forEach(function(card) {
            const cardTop = card.getBoundingClientRect().top; // 卡片頂部位置
            const windowHeight = window.innerHeight; // 視窗高度
            
            // 如果卡片出現在畫面中
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1'; // 顯示卡片
                card.style.transform = 'translateY(0)'; // 移回原位
            }
        });
    }
    
    // 滾動時檢查卡片
    window.addEventListener('scroll', checkCardsInView);
    
    // 頁面載入時也檢查一次
    checkCardsInView();
}

/* ===================================
   4. 社群連結效果
   =================================== */
function setupSocialEffects() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(function(link) {
        // 滑鼠移入時
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)'; // 放大 1.2 倍
            this.style.color = '#ffd700'; // 變成金色
        });
        
        // 滑鼠移出時
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)'; // 恢復原大小
            this.style.color = ''; // 恢復原顏色
        });
    });
}

/* ===================================
   5. 頁面載入完成後的效果
   =================================== */
window.addEventListener('load', function() {
    // 讓整個頁面淡入
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
    
    console.log('網站載入完成！');
});

/* ===================================
   額外功能：返回頂部
   =================================== */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
