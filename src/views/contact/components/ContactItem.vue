<script setup>
const props = defineProps({
  contact: Object,
});

const emit = defineEmits(['deleteContact']);

const confirmDelete = () => {
  if (window.confirm(`Are you sure you want to delete ${props.contact.name} ? `)) {
    emit('deleteContact', props.contact.id);
  }
};
</script>

<template>

  <button class="btn btn-sm btn-outline-danger" @click="confirmDelete">
    <i class="fas fa-trash"></i>
  </button>

</template>