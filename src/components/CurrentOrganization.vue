<template>
  <v-card class="mx-auto" height="750">
    <v-card-title class="mb-5 mt-4">
      Current Organization Details
    </v-card-title>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            type="date"
            :rules="[rules.required]"
            v-model="CurrOrgoDetails.JoiningDate"
            variant="underlined"
            label="Joining Date"
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            type="date"
            :rules="[rules.required]"
            v-model="CurrOrgoDetails.AppraisalDate"
            variant="underlined"
            label="Next Appraisal Date"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[rules.required]"
            v-model="CurrOrgoDetails.currentCTC"
            label="Current CTC"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { watch, defineEmits, onBeforeUnmount } from "vue";
import { onBeforeMount } from "vue";
import { useStore } from "../store/index.js";
const store = useStore();
const isValid = ref(false);

let CurrOrgoDetails = ref({
  JoiningDate: null,
  AppraisalDate: null,
  currentCTC: "",
});

let defaultItem = ref({
  JoiningDate: null,
  AppraisalDate: null,
  currentCTC: "",
});

onBeforeMount(() => {
  if (store.isEditing) {
    const data = store.editingData();
    CurrOrgoDetails.value = data.CurrentOrganizationDetails;
    emit("validation", true);
  } else {
    CurrOrgoDetails.value =
      store.EditData.CurrentOrganizationDetails || defaultItem.value;
  }
});

onBeforeUnmount(() => {
  if (store.isEditing) {
    store.isEditing = false;
    store.EditData.CurrentOrganizationDetails = CurrOrgoDetails.value;
    store.setEditedData();
  } else {
    store.EditData.CurrentOrganizationDetails = CurrOrgoDetails.value;
    store.setAllData();
    store.setValues();
  }
});

const emit = defineEmits(["validation"]);

watch(isValid, (newIsValid) => {
  emit("validation", newIsValid);
});

const rules = {
  required: (v) => !!v || "This field is required",
};
</script>
