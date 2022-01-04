import {createApp, h} from 'vue';
import ContactForm from './components/ContactForm.vue';

const form = document.getElementById('contact-form');
if (form) {
    createApp({
        render() { return h(ContactForm) },
    }).mount(document.getElementById('contact-form'));
}
