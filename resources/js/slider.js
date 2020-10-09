import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination, Autoplay]);

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let sliders = document.querySelectorAll('[data-slider]');
        if(sliders.length > 0){
            for(var i = 0; i < sliders.length; i++){
                const swiper = new Swiper(sliders[i],{
                    loop: true,
                    speed: 500,
                    effect: 'slide',
                    cssMode: true,
                    preventInteractionOnTransition: true,
                    autoplay: {
                        delay: 7500,
                        disableOnInteraction: true,
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
