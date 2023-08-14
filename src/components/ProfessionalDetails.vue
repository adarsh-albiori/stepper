<template>
  <v-card class="mx-auto" height="750" border="false">
    <v-card-title class="mb-5 mt-4"> Professional Details </v-card-title>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="professionalDetails.designation"
            :rules="designationnameRules"
            :counter="10"
            label="Designation *"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="DepartmentNameRules"
            v-model="professionalDetails.department"
            :counter="10"
            label="Department *"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="2"><v-card-text>Experience:</v-card-text></v-col>
        <v-col cols="12" md="2">
          <v-select
            :rules="numberRules"
            variant="underlined"
            clearable
            v-model="professionalDetails.experience.years"
            label="Years *"
            :items="[
              '0 years',
              '1 years',
              '2 years',
              '3 years',
              '4 years',
              '5 years',
              '6 years',
              '7 years',
              '8 years',
              '9 years',
              '10 years',
            ]"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :rules="numberRules"
            variant="underlined"
            clearable
            v-model="professionalDetails.experience.months"
            label="Months *"
            :items="[
              '1 month',
              '2 months',
              '3 months',
              '4 months',
              '5 months',
              '6 months',
              '7 months',
              '8 months',
              '9 months',
              '10 months',
              '11 months',
            ]"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="numberRules"
            v-model="professionalDetails.currentLocation"
            :counter="10"
            label="Current Location *"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-select
            :rules="numberRules"
            variant="underlined"
            clearable
            multiple
            v-model="professionalDetails.skills"
            label="Skills *"
            :items="['Angular', 'React', 'Vue']"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            :rules="numberRules"
            variant="underlined"
            v-model="professionalDetails.resume"
            accept=".pdf"
            placeholder="Resume"
            label="Upload Resume"
            required
          ></v-file-input>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "../store/index.js";
import { ref, onBeforeMount } from "vue";
import { watch, defineEmits, onBeforeUnmount } from "vue";
const isValid = ref(false);
const store = useStore();

const emit = defineEmits(["validation"]);

watch(isValid, (newIsValid) => {
  emit("validation", newIsValid);
});

let professionalDetails = reactive({
  designation: "",
  department: "",
  experience: { years: null, months: null },
  currentLocation: "",
  skills: "",
  resume: null,
});

const DefaultItems = reactive({
  designation: "",
  department: "",
  experience: { years: null, months: null },
  currentLocation: "",
  skills: "",
  resume: null,
});

onBeforeMount(() => {
  if (store.isEditing) {
    const data = store.editingData();
    professionalDetails = data.ProfessionalDetails;
  } else {
    professionalDetails = store.EditData.ProfessionalDetails || DefaultItems;
  }
});

onBeforeUnmount(() => {
  store.EditData.ProfessionalDetails = professionalDetails;
});

const numberRules = reactive([
  (value) => {
    if (value) return true;
    return "This field is required";
  },
]);

const designationnameRules = reactive([
  (value) => {
    if (value) return true;

    return "Designation is required.";
  },
]);
const DepartmentNameRules = reactive([
  (value) => {
    if (value) return true;

    return "Department is required.";
  },
]);
</script>
