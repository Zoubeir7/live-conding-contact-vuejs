<script setup>


import { useContactStore } from '@store/contactStore';
import { useRouter } from "vue-router";

import ContactItem from '@views/contact/components/ContactItem.vue';
const route = useRouter();
const store = useContactStore();

const handleDeleteContact = (id) => {
  store.remove(id);
};

</script>

<template>
  <div>
    <h1>Contact List</h1>
    <div class="btn-right-action mt-4 mb-4 d-flex justify-content-end">
      <CustomBtn custom-class="btn btn-danger" title="New contact" icon="fas fa-plus" isLink route="contact/new" />
    </div>
    <div class="contact-list-table">
      <table class="table table-hover table-bordered">
        <thead>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Number</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </thead>
        <tbody>
          <tr v-if="store.contacts.length === 0">
            <td colspan="5">No data</td>
          </tr>
          <tr v-for="item in store.contacts" :key="item.id">
            <td scope="row">{{ `# ${item.id} ` }}</td>
            <td>{{ item.name }} {{ item.id }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.email }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary me-2"
                @click="
                  store.show(item.id), route.push('/contact/show/' + item.id)
                "
              >
                <i class="fas fa-eye"></i>
              </button>

              <router-link
                :to="`/contact/edit/${item.id}`"
                class="btn btn-sm btn-secondary me-2">
                <i class="fas fa-edit"></i>
              </router-link>

              <ContactItem :contact="item" @deleteContact="handleDeleteContact" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>