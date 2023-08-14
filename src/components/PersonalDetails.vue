<template>
  <v-card class="mx-auto cardColor" height="750">
    <v-card-title class="mb-5 mt-4"> Personal Details </v-card-title>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-row class="mx-5">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="PersonalDetails.firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="PersonalDetails.middlename"
            :rules="nameRules"
            label="Middle Name"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="PersonalDetails.lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="PersonalDetails.email"
            variant="underlined"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="PersonalDetails.number"
            :rules="numberRules"
            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
            variant="underlined"
            :counter="10"
            label="Mobile Number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            type="date"
            :rules="numberRules"
            v-model="PersonalDetails.birthDate"
            variant="underlined"
            label="Date of Birth"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="7">
          <v-file-input
            :rules="[rules.required]"
            variant="underlined"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Profile Picture"
            prepend-icon="mdi-camera"
            label="Upload Profile Picture"
            @change="inputImage"
            required
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-textarea
            v-model="PersonalDetails.presentAdd"
            :rules="[rules.required]"
            label="Present Address"
            clearable
            variant="underlined"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="PersonalDetails.permanentAdd"
            :rules="[rules.required]"
            label="Permanent Address"
            clearable
            variant="underlined"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-checkbox
        v-model="copyPermanent"
        class="pe-2"
        label="Copy to Permanent Address"
        @click="PersonalDetails.permanentAdd = PersonalDetails.presentAdd"
      ></v-checkbox>
    </v-form>
  </v-card>
</template>
<script setup>
import { useStore } from "../store/index.js";
import { onBeforeUnmount } from "vue";
import { reactive, watch } from "vue";
import { ref, onBeforeMount, defineEmits } from "vue";
const isValid = ref(null);
const copyPermanent = ref(false);
const store = useStore();

let PersonalDetails = ref({
  firstname: "",
  middlename: "",
  number: "",
  lastname: "",
  presentAdd: "",
  permanentAdd: "",
  email: "",
  profilePic: null,
  birthDate: null,
});

const emit = defineEmits(["validation"]);

const DefaultItems = reactive({
  firstname: "",
  middlename: "",
  number: "",
  lastname: "",
  presentAdd: "",
  permanentAdd: "",
  email: "",
  profilePic: null,
  birthDate: null,
});

watch(isValid, (newIsValid) => {
  emit("validation", newIsValid);
});

onBeforeMount(() => {
  if (store.isEditing) {
    const data = store.editingData();
    emit("validation", true);
    PersonalDetails.value = data.PersonalDetails;
  } else {
    PersonalDetails.value = store.EditData.PersonalDetails || DefaultItems;
  }
});
onBeforeUnmount(() => {
  store.EditData.PersonalDetails = PersonalDetails.value;
});

const rules = {
  required: (v) => !!v || "This field is required",
};

const nameRules = reactive([
  (value) => {
    if (value) return true;

    return "Name is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;

    return "Name must be less than 10 characters.";
  },
]);
function inputImage(event) {
  if (event) {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return reader.addEventListener("load", () => {
      PersonalDetails.value.profilePic = reader.result;
    });
  }
}
const emailRules = reactive([
  (value) => {
    if (value) return true;

    return "E-mail is requred.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);
const numberRules = reactive([
  (value) => {
    if (value) return true;

    return "Number is required.";
  },
  (value) => {
    if (value?.length === 10) return true;

    return "Number must be of 10 Digits.";
  },
]);
</script>

<style scoped>
.cardColor {
  border-bottom-color: transparent !important;
}
</style>
