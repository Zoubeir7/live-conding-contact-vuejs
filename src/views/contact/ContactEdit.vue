<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useContactStore } from '@store/contactStore';
const store = useContactStore();

const emit = defineEmits(["onEditForm"]);

const route = useRoute();
const router = useRouter()

const contact = store.getContactById(route.params.id);

console.log(`id is ${contact.id}`)
// const form = store.contactForm;

const editContact = () =>{
  console.log(store.contactForm.name)
  if (store.contactForm.name && store.contactForm.number && store.contactForm.email) {
    console.log(route.params.id)
    store.edit(route.params.id, store.contactForm)
    router.push('/contact')
  } else {
    console.log("Please fill all fields in form");
  }
}
</script>

<template>
  <div>
    <h1>Contact edit</h1>
    <div class="contact-add w-50 m-auto">
      <ContactForm mode="edit" :contact="contact" @on-submit-edit-form="editContact"/>
    </div>
  </div>
</template>

<style scoped>
</style>
