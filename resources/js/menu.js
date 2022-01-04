document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.menu-toggle').addEventListener('click', event => {
        event.preventDefault();
        const menu = document.querySelector('.main-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.menu-toggle')) {
            document.querySelector('.main-menu').classList.add('hidden');
        }
    });
});