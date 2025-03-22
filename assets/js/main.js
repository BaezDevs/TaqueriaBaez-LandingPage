document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for continuous, smooth sliding
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 25, // Reduced gap between slides
        loop: true,
        loopedSlides: 10, // More looped slides for smoother infinite loop
        loopAdditionalSlides: 5,
        centeredSlides: false,
        allowTouchMove: true,
        speed: 12000, // Even slower for smoother effect
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        freeMode: {
            enabled: true,
            sticky: false,
            momentumRatio: 0.05,
            momentumVelocityRatio: 0.05,
        }
    });
    
    // Pause carousel on hover
    const swiperEl = document.querySelector('.swiper');
    if (swiperEl) {
        swiperEl.addEventListener('mouseenter', function() {
            swiper.autoplay.stop();
        });
        
        swiperEl.addEventListener('mouseleave', function() {
            swiper.autoplay.start();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade in elements on scroll
    const fadeElems = document.querySelectorAll('.cta-block, .social-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElems.forEach(elem => {
        elem.classList.add('fade-in');
        observer.observe(elem);
    });
    
    // Mobile navigation toggle (for responsive design)
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-nav-toggle');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        nav.insertBefore(mobileToggle, navLinks);
        
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            const isExpanded = navLinks.classList.contains('show');
            this.innerHTML = isExpanded 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
});