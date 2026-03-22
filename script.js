document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animations --- */
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    /* --- Scroll Progress Bar --- */
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }

    /* --- Count Up Animation for Stats --- */
    const countUpElements = document.querySelectorAll('.count-up');
    
    const countUpCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const countUpObserver = new IntersectionObserver(countUpCallback, {
        root: null,
        threshold: 0.5
    });
    
    countUpElements.forEach(element => {
        countUpObserver.observe(element);
    });

    function startCountUp(element) {
        const targetNumber = parseInt(element.getAttribute('data-target'), 10);
        const duration = 1800; // 1.8 seconds per requirements
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let currentFrame = 0;
        
        // Easing function (easeOutExpo)
        const easeOutExpo = (t) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
        
        const updateCounter = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentCount = Math.round(targetNumber * easeOutExpo(progress));
            
            element.textContent = currentCount;
            
            if (currentFrame < totalFrames) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetNumber; // Ensure it ends precisely at target
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
});
