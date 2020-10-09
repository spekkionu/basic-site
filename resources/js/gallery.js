import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let galleries = document.querySelectorAll('[data-photogallery]');
        if(galleries.length > 0){
            GLightbox({
                selector: '[data-photogallery] a'
            });
        }
    });
})();
