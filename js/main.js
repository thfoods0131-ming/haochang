/* ═══════════════════════════════════════════════
   豪昌生技有限公司 — main.js
   共用：Navbar active、漢堡選單、Cookie Banner、
         懸浮按鈕、FAQ Accordion、數字動畫、AOS
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────
     1. Navbar Active 頁面標示
  ────────────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ──────────────────────────────
     2. Navbar Scroll Effect
  ────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ──────────────────────────────
     3. 漢堡選單（手機版）
  ────────────────────────────── */
  const toggler = document.querySelector('.navbar-toggler');
  const navMobile = document.querySelector('.nav-mobile');
  if (toggler && navMobile) {
    toggler.addEventListener('click', () => {
      toggler.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
    // 點擊連結後關閉
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggler.classList.remove('open');
        navMobile.classList.remove('open');
      });
    });
  }

  /* ──────────────────────────────
     4. Cookie Banner
  ────────────────────────────── */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    if (localStorage.getItem('cookieConsent') === 'true') {
      cookieBanner.style.display = 'none';
    }
    const okBtn = document.getElementById('cookieOk');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.style.display = 'none';
      });
    }
  }

  /* ──────────────────────────────
     5. 懸浮聯絡按鈕（動態插入）
  ────────────────────────────── */
  const floatHtml = `
    <div class="float-btns" id="floatBtns">
      <a href="tel:0980911471" class="float-btn phone" aria-label="撥打電話諮詢">
        <i class="fas fa-phone"></i>
        <span class="float-btn-tip">電話諮詢</span>
      </a>
      <a href="https://line.me/ti/p/~kim740105" target="_blank" rel="noopener" class="float-btn line" aria-label="LINE 聯絡我們">
        <i class="fab fa-line"></i>
        <span class="float-btn-tip">LINE 諮詢</span>
      </a>
      <a href="https://www.facebook.com/p/%E8%B1%AA%E6%98%8C%E7%94%9F%E6%8A%80%E4%BA%8C%E6%B0%A7%E5%8C%96%E6%B0%AF%E7%B2%89%E7%B5%B2%E5%9C%98-100057274655493/"
         target="_blank" rel="noopener" class="float-btn facebook" aria-label="Facebook 粉絲團">
        <i class="fab fa-facebook-f"></i>
        <span class="float-btn-tip">Facebook</span>
      </a>
      <button id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="回到頂部">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', floatHtml);

  // Back to top 顯示控制
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
  }

  /* ──────────────────────────────
     6. Cookie Banner HTML（動態插入）
  ────────────────────────────── */
  if (!document.getElementById('cookieBanner')) {
    const cbHtml = `
      <div id="cookieBanner">
        <p>本網站使用 Cookie 以提升使用體驗及流量分析。繼續瀏覽即表示您同意我們的
          <a href="privacy.html">隱私權政策</a>。
        </p>
        <div class="cookie-btns">
          <button class="cookie-btn-ok" id="cookieOk">我知道了</button>
          <a href="privacy.html" class="cookie-btn-more">了解更多</a>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', cbHtml);
    if (localStorage.getItem('cookieConsent') === 'true') {
      document.getElementById('cookieBanner').style.display = 'none';
    }
    document.getElementById('cookieOk').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      document.getElementById('cookieBanner').style.display = 'none';
    });
  }

  /* ──────────────────────────────
     7. FAQ Accordion
  ────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // 關閉所有
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      // 若非已開啟則開啟
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  /* ──────────────────────────────
     8. 數字計數動畫
  ────────────────────────────── */
  function countUp(el, target, suffix) {
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(num => {
            const text = num.dataset.target || num.textContent;
            if (text.includes('99')) countUp(num, 99, '%');
            else if (text.includes('500')) countUp(num, 500, '+');
            else if (text.includes('6')) countUp(num, 6, '+');
            else if (text.includes('0')) num.textContent = '0';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  /* ──────────────────────────────
     9. 聯絡表單送出提示
  ────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      setTimeout(() => {
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
      }, 100);
    });
  }

  /* ──────────────────────────────
     10. AOS 初始化
  ────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 60, duration: 720, easing: 'ease-out-quad' });
  }

});
