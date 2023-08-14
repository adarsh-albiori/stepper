<template>
  <v-card class="mx-auto" height="750">
    <v-data-table :headers="headers" :items="eduData" class="mx-5 elevation-6">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Education Details</v-toolbar-title>
          <v-dialog v-model="dialogs" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="red" class="mb-2" v-bind="props" variant="elevated">
                + Add Education
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="isValid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="fieldRules"
                          v-model="editedItem.educationName"
                          label="Education Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="fieldRules"
                          v-model="editedItem.universityName"
                          label="University Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="fieldRules"
                          v-model="editedItem.resultValue"
                          label="Result"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="fieldRules"
                          v-model="editedItem.year"
                          label="Year of Passing"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  :disabled="!isValid"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogsDeleted" max-width="500px">
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
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item.raw)"
          color="deep-purple-darken-3"
        >
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)" color="red">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <p>No Records</p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import {
  ref,
  defineEmits,
  reactive,
  computed,
  watch,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
} from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useStore } from "../store/index.js";

const store = useStore();
const dialogs = ref(false);
const dialogsDeleted = ref(false);
const isValid = ref(null);
const emit = defineEmits(["Data"]);

onBeforeMount(() => {
  if (store.isEditing) {
    const data = store.editingData();
    eduData.value = data.EducationalDetails;
  } else {
    eduData.value = store.EditData.EducationalDetails || [];
  }
});

onBeforeUnmount(() => {
  store.EditData.EducationalDetails = eduData.value;
});

const headers = reactive([
  {
    title: "Education Name",
    align: "center",
    sortable: false,
    key: "educationName",
  },
  { title: "University Name", align: "center", key: "universityName" },
  { title: "Result", align: "center", key: "resultValue" },
  { title: "Year of Passing", align: "center", key: "year" },
  { title: "Actions", align: "center", key: "actions", sortable: false },
]);
let eduData = ref([]);
let editedIndex = ref(-1);
const editedItem = ref({
  educationName: "",
  universityName: "",
  resultValue: null,
  year: null,
});
const defaultItem = ref({
  educationName: "",
  universityName: "",
  resultValue: null,
  year: null,
});

const fieldRules = reactive([
  (value) => {
    if (value) return true;
    return "This field is required";
  },
]);

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

watch(dialogs, (val) => {
  val || close();
});

watch(dialogsDeleted, (val) => {
  val || closeDelete();
});

watch(
  eduData,
  (d) => {
    if (d.length <= 0) {
      emit("Data", false);
    } else if (d.length > 0) {
      emit("Data", true);
    }
  },
  { deep: true }
);

function editItem(item) {
  editedIndex.value = eduData.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogs.value = true;
}

function deleteItem(item) {
  editedIndex.value = eduData.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogsDeleted.value = true;
}

function deleteItemConfirm() {
  eduData.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialogs.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogsDeleted.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(eduData.value[editedIndex.value], editedItem.value);
  } else {
    eduData.value.push(editedItem.value);
  }

  close();
}
</script>

<style scoped></style>
