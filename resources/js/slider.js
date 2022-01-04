import Swiper, { Navigation, Pagination, Autoplay, Lazy } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/lazy';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let sliders = document.querySelectorAll('[data-slider]');
        if(sliders.length > 0){
            for(let i = 0; i < sliders.length; i++){
                const swiper = new Swiper(sliders[i],{
                    modules: [Navigation, Pagination, Autoplay, Lazy],
                    loop: true,
                    speed: 500,
                    effect: 'slide',
                    cssMode: true,
                    preventInteractionOnTransition: true,
                    autoplay: {
                        delay: 7500,
                        disableOnInteraction: true,
                    },
                    lazy: {
                        loadPrevNext: true,
                        loadOnTransitionStart: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                        bulletElement: 'button'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }
        }
    });
})();
