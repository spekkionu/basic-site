document.addEventListener('DOMContentLoaded', (event) => {
    const lazyImages = [].slice.call(document.querySelectorAll('[data-lazyload]'));

    const lazyLoad = element => {
        if ('backgroundImage' in element.dataset) {
            element.style.backgroundImage = element.dataset.backgroundImage;
            element.removeAttribute('data-background-image');
        }
        if ('src' in element.dataset) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }
        if ('srcset' in element.dataset) {
            element.srcset = element.dataset.srcset;
            element.removeAttribute('data-srcset');
        }
        element.classList.add('lazyloaded');
        element.removeAttribute('data-lazyload');
    }

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(
            function (entries, observer) {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        lazyLoad(entries[i].target);
                        lazyImageObserver.unobserve(entries[i].target);
                    }
                }
            }, {
                rootMargin: '250px 0px'
            });

        for (let i = 0; i < lazyImages.length; i++) {
            lazyImageObserver.observe(lazyImages[i]);
        }
    } else {
        // For browsers that don't support IntersectionObserver yet,
        // load all the images now:
        for (let i = 0; i < lazyImages.length; i++) {
            lazyLoad(lazyImages[i]);
        }
    }
});