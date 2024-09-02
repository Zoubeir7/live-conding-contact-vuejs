import { defineStore } from "pinia";
import { reactive } from "vue";

export const useContactStore = defineStore("contactStore", {
  state: () => ({
    contacts: [
      {
        id: 1,
        name: "Ag",
        number: "32022532",
        email: "ag@gmail.com",
      },
      {
        id: 2,
        name: "Aichetou Taher",
        number: "34556677",
        email: "taher@gmail.com",
      },
      {
        id: 3,
        name: "Harouna FOFANA",
        number: "66554433",
        email: "harouna@gmail.com",
      },
      {
        id: 4,
        name: "Mariem FOFANA",
        number: "66554433",
        email: "mariem@gmail.com",
      },
    ],
    currentContact: null,
    contactForm: reactive({
      name: null,
      number: null,
      email: null,
    }),
    id: 0,
  }),
  actions: {
    resetForm() {
      this.contactForm.name = null;
      this.contactForm.number = null;
      this.contactForm.email = null;
    },
    getContactById(id) {
      // const contact =  this.contacts.find(c => c.id == id);
      // if(contact){
      //     Object.assign(this.contactForm, contact)
      // }
      if (!id) return null;

      const val = this.contacts.find((c) => c.id == id);
      //   console.log("get element by id")
      //   console.log(val)
      return val;
    },
    add() {
      const maxId =
        this.contacts.length > 0
          ? Math.max(...this.contacts.map((c) => c.id))
          : 0;
      const newId = maxId + 1;
      console.log(`Add id is ${newId}`);
      const newContact = {
        ...this.contactForm,
        id: newId,
      };
      console.log(newContact);
      this.contacts.push(newContact);
      //   console.log(this.contacts)
      this.resetForm();
    },
    edit(id, newContact) {
      console.log(`Edit id is ${id}`);
      const contactIndex = this.contacts.findIndex((c) => c.id == id);

         if (contactIndex !== -1) {
      this.contacts[contactIndex] = {
            ...newContact
      }
    }
/*  }
      console.log(newContact);
      if(contactIndex){
        Object.assign(contactIndex, {
            ...newContact,
            id: Number(id),
          });
      }*/
     
      console.log(this.contacts);
    },
    show(id) {
      const contactIndex = this.contacts.findIndex((c) => c.id === id);
      if (contactIndex !== -1) {
        this.currentContact = this.contacts[contactIndex];
      }
    },
    remove(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    },
  },
});
