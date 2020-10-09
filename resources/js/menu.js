import 'element-closest';

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.menu-toggle').addEventListener('click', event => {
        event.preventDefault();
        document.querySelector('.main-menu').classList.toggle('hidden');
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.menu-toggle')) {
            document.querySelector('.main-menu').classList.add('hidden');
        }
    });
});