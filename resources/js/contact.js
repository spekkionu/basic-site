import Vue from 'vue';
import ContactForm from './components/ContactForm.vue';

const form = document.getElementById('contact-form');
if (form) {
    new Vue({
        el: document.getElementById('contact-form'),
        render: h => h(ContactForm),
    });
}
