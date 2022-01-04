import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

Swiper.use([Navigation, Pagination, Autoplay]);

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let testimonials = document.querySelectorAll('[data-testimonials]');
        if(testimonials.length > 0){
            for(let i = 0; i < testimonials.length; i++){
                const swiper = new Swiper(testimonials[i],{
                    loop: true,
                    speed: 500,
                    effect: 'slide',
                    cssMode: true,
                    preventInteractionOnTransition: true,
                    autoplay: {
                        delay: 5000,
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
