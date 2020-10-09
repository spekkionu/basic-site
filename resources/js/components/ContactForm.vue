<template>
  <form :action="url" method="post" @submit.prevent="submit" netlify-honeypot="bot-field">
    <div class="mb-2">
      <label class="block mb-1" for="contact-name">Name</label>
      <input id="contact-name" class="" type="text" name="name" required autocomplete="name">
    </div>
    <div class="mb-2">
      <label class="block mb-1" for="contact-email">Email</label>
      <input id="contact-email" class="" type="email" name="email" required autocomplete="email">
    </div>
    <div class="mb-2">
      <label class="block mb-1" for="contact-phone">Phone</label>
      <input id="contact-phone" class="" type="tel" name="phone" autocomplete="phone">
    </div>
    <div class="mb-2">
      <label class="block mb-1" for="contact-message">Message</label>
      <textarea id="contact-message" class="" name="message" required></textarea>
    </div>
    <div>
      <button type="submit" class="btn">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>
