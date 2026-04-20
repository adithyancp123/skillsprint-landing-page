document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const stickyCta = document.getElementById('sticky-cta');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (scrollY > 600) {
            if (stickyCta) stickyCta.classList.add('visible');
            if (backToTop) backToTop.classList.add('visible');
        } else {
            if (stickyCta) stickyCta.classList.remove('visible');
            if (backToTop) backToTop.classList.remove('visible');
        }
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('ph-list');
                icon.classList.toggle('ph-x');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('ph-list');
                    icon.classList.remove('ph-x');
                }
            });
        });
    }

    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.slider-btn.next');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const dotsNav = document.querySelector('.slider-dots');
        
        let currentIndex = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            if (dotsNav) dotsNav.appendChild(dot);
        });

        const dots = dotsNav ? Array.from(dotsNav.children) : [];

        const updateDots = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        };

        const moveToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
            track.style.transform = `translateX(-${(slideWidth + gap) * index}px)`;
            currentIndex = index;
            updateDots(currentIndex);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

        let slideTimer = setInterval(() => moveToSlide(currentIndex + 1), 6000);
        
        track.addEventListener('mouseenter', () => clearInterval(slideTimer));
        track.addEventListener('mouseleave', () => {
            slideTimer = setInterval(() => moveToSlide(currentIndex + 1), 6000);
        });

        window.addEventListener('resize', () => moveToSlide(currentIndex));
    }

    const pricingToggle = document.getElementById('pricing-toggle-checkbox');
    const amountElements = document.querySelectorAll('.amount');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            const isAnnual = pricingToggle.checked;
            amountElements.forEach(el => {
                const newValue = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
                el.style.opacity = '0';
                setTimeout(() => {
                    el.innerText = newValue;
                    el.style.opacity = '1';
                }, 200);
            });
        });
    }

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));

    const featureCards = document.querySelectorAll('.feature-card, .pricing-card, .hero-content');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const mockup = document.querySelector('.glass-mockup');
    if (mockup && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 80;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 80;
            mockup.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.96)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    const shapes = document.querySelectorAll('.bg-shape');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const moveX = (x - 0.5) * (index + 1) * 30;
            const moveY = (y - 0.5) * (index + 1) * 30;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
