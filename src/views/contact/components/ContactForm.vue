<script setup>
import { useContactStore } from "@store/contactStore";
import { watch, reactive } from "vue";
const store = useContactStore();

const emit = defineEmits(["onSubmitAddForm", "onSubmitEditForm"]);

const props = defineProps({
  contact: {
    require: false,
    default: null,
    type: Object,
  },
  mode: {
    require: true,
    default: null,
    type: String,
  },
});

if (props.mode === "edit" && props.contact) {
  store.contactForm = props.contact;
}

const form = store.contactForm;

const errors = reactive({
  name: "",
  number: "",
  email: "",
});

const validate = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if(!form.name){
      errors.name="Nom est obligatoire"
    }else if(!nameRegex.test(form.name)){
      errors.name= "Nom ne doit pas avoir des nombre"
    }else if (form.name.length < 3) {
      errors.name="Nom doit avoir au moins 3 cracteres"
    }else{
        errors.name=""
    }

    const numberRegex = /^[0-9]{8}$/;
    if(!numberRegex.test(form.number)){
      errors.number= "Numéro ne doit etre 8 chiffre, ne doit pas avoir des lettres"
    }else if(!form.number){
      errors.number="Numéro est obligatoire"
    }else{
        errors.number=""
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.email){
      errors.email="Email est obligatoire"
    }else if(!emailRegex.test(form.email)){
      errors.email= "Email est invalide"
    }else{
        errors.email=""
    }
};

watch(
  () => form,
   () => {
    validate();
  },
  { deep: true }
);
// const isSubmit = false
const onSubmit = () => {
      validate();
    if (!errors.name && !errors.number && !errors.email) {
      if(props.mode === "edit"){
        console.log("onSubmitEditForm")
        emit("onSubmitEditForm");
      }else{
        console.log("onSubmitAddForm")
        emit("onSubmitAddForm");
      }
      }
};


</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Your name"
        v-model="form.name"
      />
      <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
    </div>
    <div class="mb-3">
      <label for="number" class="form-label">Number</label>
      <input
        type="text"
        class="form-control"
        id="number"
        placeholder="Your number"
        v-model="form.number"
      />
      <div v-if="errors.number" class="text-danger">{{ errors.number }}</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Your email"
        v-model="form.email"
      />
      <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>  

    </div>

    <div class="mt-5 d-flex justify-content-end">
      <CustomBtn
        custom-class="btn btn-primary"
        :title="mode === 'edit' ? 'Save' : 'Submit'"
        icon="fas fa-paper-plane"
      />
    </div>
  </form>
</template>

<style scoped></style>
