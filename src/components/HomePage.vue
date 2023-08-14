<template>
  <v-data-table
    :headers="store.headers"
    :items="userData"
    :sort-by="[{ key: 'Name', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:[`item.Profile`]="{ item }">
      <v-avatar color="white" size="60" rounded="5" class="mb-2">
        <v-img cover :src="`https://robohash.org/${item.columns.Name}`"></v-img>
      </v-avatar>
    </template>
    <template v-slot:[`item.Resume`]>
      <v-icon color="yellow">mdi-file</v-icon>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Employee Management System</v-toolbar-title>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)" color="red">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No Data Available</p>
    </template>
  </v-data-table>
  <v-btn class="mt-5 mb-5" color="black" @click="go">add employee</v-btn>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, watch, nextTick } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useRouter } from "vue-router";
import { useStore } from "../store/index.js";

const store = useStore();
const router = useRouter();
const dialog = ref(false);
const dialogDelete = ref(false);
const userData = ref([]);
const editedIndex = ref(1);
const editedItem = ref({
  Name: "",
  Department: 0,
  Designation: 0,
  Email: 0,
  Number: 0,
});
const defaultItem = ref({
  Name: "",
  Department: 0,
  Designation: 0,
  Email: 0,
  Number: 0,
});

onMounted(() => {
  userData.value = store.showData();
});

watch(dialog, (val) => {
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

function go() {
  router.push("/stepper");
}

function editItem(item) {
  store.isEditing = true;
  let selected = userData.value.find((v) => v === item);
  store.editingIndex = userData.value.indexOf(selected);
  store.editingItem = item;
  router.push("/stepper");
}

function deleteItem(item) {
  editedIndex.value = userData.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  userData.value.splice(editedIndex.value, 1);
  store.deletingData(editedIndex.value);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  });
}
function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  });
}
</script>
