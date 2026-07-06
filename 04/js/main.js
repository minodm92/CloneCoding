document.addEventListener('DOMContentLoaded', () => {
    const restartHeroMotion = (swiper) => {
        swiper.slides.forEach((slide) => {
            slide.classList.remove('motion-on');
        });

        requestAnimationFrame(() => {
            swiper.slides[swiper.activeIndex].classList.add('motion-on');
        });
    };

    const scrollToTop = (duration) => {
        const startY = window.scrollY;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY * (1 - easedProgress));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const smoothScrollTo = (targetY, duration) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const setPageMenuOn = (activeItem) => {
        document.querySelectorAll('.page-menu li').forEach((item) => {
            item.classList.remove('on');
        });

        activeItem.classList.add('on');
    };

    const setPageMenuColor = (targetId) => {
        const pageMenu = document.querySelector('.page-menu');

        if (!pageMenu) {
            return;
        }

        if (targetId === '#hero') {
            pageMenu.classList.remove('is-dark');
        } else {
            pageMenu.classList.add('is-dark');
        }
    };

    const pageMenuLinks = document.querySelectorAll('.page-menu a');
    const pageSections = Array.from(pageMenuLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter((section) => section);

    const updatePageMenuBySection = (sectionId) => {
        const activeLink = document.querySelector(`.page-menu a[href="#${sectionId}"]`);
        const activeItem = activeLink?.closest('li');

        if (!activeItem) {
            return;
        }

        setPageMenuOn(activeItem);
        setPageMenuColor(`#${sectionId}`);
    };

    const updatePageMenuOnScroll = () => {
        const checkPoint = window.scrollY + window.innerHeight / 2;
        let activeSection = pageSections[0];

        pageSections.forEach((section) => {
            if (section.offsetTop <= checkPoint) {
                activeSection = section;
            }
        });

        if (activeSection) {
            updatePageMenuBySection(activeSection.id);
        }
    };

    let scrollFrame = null;

    const requestPageMenuUpdate = () => {
        if (scrollFrame) {
            return;
        }

        scrollFrame = requestAnimationFrame(() => {
            updatePageMenuOnScroll();
            scrollFrame = null;
        });
    };

    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        effect: 'fade',
        speed: 1000,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.hero-controls .btn-next',
            prevEl: '.hero-controls .btn-prev',
        },
        on: {
            init: (swiper) => {
                restartHeroMotion(swiper);
            },
            slideChangeTransitionStart: (swiper) => {
                restartHeroMotion(swiper);
            },
        },
    });

    const topButton = document.querySelector('#footer .btn-top');

    if (topButton) {
        topButton.addEventListener('click', (event) => {
            event.preventDefault();
            const mainMenuItem = document.querySelector('.page-menu a[href="#hero"]')?.closest('li');

            if (mainMenuItem) {
                setPageMenuOn(mainMenuItem);
            }

            setPageMenuColor('#hero');
            scrollToTop(400);
        });
    }

    pageMenuLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            const menuItem = link.closest('li');

            if (!target || !menuItem) {
                return;
            }

            setPageMenuOn(menuItem);
            setPageMenuColor(link.getAttribute('href'));
            smoothScrollTo(target.offsetTop, 600);
        });
    });

    window.addEventListener('scroll', requestPageMenuUpdate);
    window.addEventListener('resize', requestPageMenuUpdate);
    updatePageMenuOnScroll();

    void heroSwiper;
});
