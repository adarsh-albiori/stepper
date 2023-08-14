<template>
  <v-card class="mx-auto" height="750">
    <v-card-title class="mb-5 mt-4"> Bank Details </v-card-title>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.bankName"
            :rules="banknameRules"
            label="Bank Name"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.accountName"
            :rules="accountNameRules"
            label="Account Name"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.accountNumber"
            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
            :rules="accountNumberRules"
            :counter="18"
            label="Bank Account Number"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.ifscCode"
            :rules="ifscCodeRule"
            :counter="10"
            label="Bank IFSC CODE"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.aadharNo"
            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
            :rules="aadharnumberRules"
            :counter="12"
            label="AADHAR CARD NUMBER"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="bankDetails.panNo"
            :rules="pannumberRules"
            :counter="10"
            label="PAN CARD NUMBER"
            variant="underlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useStore } from "../store/index.js";
import { ref, onBeforeMount, defineEmits, onBeforeUnmount } from "vue";
const isValid = ref(false);
const store = useStore();
let bankDetails = reactive({
  bankName: "",
  accountName: "",
  accountNumber: "",
  ifscCode: "",
  aadharNo: "",
  panNo: "",
});
const DefaultItems = reactive({
  bankName: "",
  accountName: "",
  accountNumber: "",
  ifscCode: "",
  aadharNo: "",
  panNo: "",
});
onBeforeMount(() => {
  if (store.isEditing) {
    const data = store.editingData();
    emit("validation", true);
    bankDetails = data.BankDetails;
  } else {
    bankDetails = store.EditData.BankDetails || DefaultItems;
  }
});
onBeforeUnmount(() => {
  store.EditData.BankDetails = bankDetails;
});
const emit = defineEmits(["validation"]);

watch(isValid, (newIsValid) => {
  emit("validation", newIsValid);
});

const banknameRules = reactive([
  (value) => {
    if (value) return true;

    return "Bank Name is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;

    return "Name must be less than 10 characters.";
  },
]);
const accountNameRules = reactive([
  (value) => {
    if (value) return true;

    return "Account Name is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;

    return "Name must be less than 10 characters.";
  },
]);
const accountNumberRules = reactive([
  (value) => {
    if (value) return true;

    return "Bank Account Number is required.";
  },
  (value) => {
    if (value?.length === 18 || value?.length === 9) return true;

    return "Bank Account Number must be of 9-18 digits.";
  },
]);
const aadharnumberRules = reactive([
  (value) => {
    if (value) return true;

    return "AADHAR CARD NUMBER is required.";
  },
  (value) => {
    if (value?.length === 12) return true;

    return "AADHAR CARD NUMBER must be of 12 digits.";
  },
]);
const pannumberRules = reactive([
  (value) => {
    if (value) return true;
    return "PAN CARD NUMBER is required";
  },
]);
const ifscCodeRule = reactive([
  (v) => !!v || "IFSC Code is required",
  (v) =>
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v) ||
    "IFSC Code must be of format AAAA0111111.",
]);
</script>
