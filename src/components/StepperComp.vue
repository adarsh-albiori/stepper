<template>
  <v-card class="mx-auto mt-5 mb-5 py-5" elevation="10">
    <div class="notificationContainer">
      <v-slide-y-transition group>
        <v-alert
          v-for="notification in notifications"
          color="warning"
          icon="$warning"
          :key="notification[0]"
          >Please add the details</v-alert
        >
      </v-slide-y-transition>
    </div>
    <div class="content-wrap">
      <div class="icon1">
        <v-icon color="blue">
          {{ activeStep === 0 ? "mdi-numeric-1-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2">Personal Details </text>
      </div>
      <div class="icon1">
        <v-icon :color="activeStep >= 1 ? `blue` : `grey`">
          {{ activeStep <= 1 ? "mdi-numeric-2-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2">Bank Details</text>
      </div>
      <div class="icon1">
        <v-icon :color="activeStep >= 2 ? `blue` : `grey`">
          {{ activeStep <= 2 ? "mdi-numeric-3-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2">Professional Details </text>
      </div>
      <div class="icon1">
        <v-icon :color="activeStep >= 3 ? `blue` : `grey`">
          {{ activeStep <= 3 ? "mdi-numeric-4-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2">Education Details </text>
      </div>
      <div class="icon1">
        <v-icon :color="activeStep >= 4 ? `blue` : `grey`">
          {{ activeStep <= 4 ? "mdi-numeric-5-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2">Experience Details </text>
      </div>
      <div class="icon1">
        <v-icon :color="activeStep >= 5 ? `blue` : `grey`">
          {{ activeStep <= 5 ? "mdi-numeric-6-circle" : "mdi-check-circle" }}
        </v-icon>
        <text class="text-overline text-black ml-2"
          >Current Organization Details</text
        >
      </div>
    </div>
    <div class="step-content cardColor">
      <transition name="fade" mode="out-in">
        <component
          :is="steps[activeStep]"
          :key="activeStep"
          @validation="handleEvents"
          @Data="handleData"
        />
      </transition>
    </div>
    <v-card-actions>
      <v-btn color="black" variant="elevated" @click="home" class="ml-16"
        >Back to List</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        @click="prevStep"
        :disabled="activeStep === 0"
        color="black"
        variant="elevated"
        >Previous</v-btn
      >
      <v-btn
        @click="nextStep"
        color="black"
        :disabled="activeStep === 3 || activeStep === 4 ? isvalid : !isValid"
        variant="elevated"
        class="mr-16 cardColor"
        >{{ activeStep === steps.length - 1 ? "Save" : "Next" }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import PersonalDetails from "../components/PersonalDetails.vue";
import BankDetails from "../components/BankDetails.vue";
import ProfessionalDetails from "../components/ProfessionalDetails.vue";
import EducationalDetails from "../components/EducationDetails.vue";
import ExperienceDetails from "../components/ExperienceDetails.vue";
import CurrentOrganization from "../components/CurrentOrganization.vue";
import { reactive, ref } from "vue";
import { markRaw } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isValid = ref(false);
const Data = ref(false);
var notifications = ref(new Map());
import { useStore } from "../store/index.js";
const store = useStore();

const steps = reactive([
  markRaw(PersonalDetails),
  markRaw(BankDetails),
  markRaw(ProfessionalDetails),
  markRaw(EducationalDetails),
  markRaw(ExperienceDetails),
  markRaw(CurrentOrganization),
]);

function handleEvents(value) {
  if (value === true) {
    isValid.value = true;
  } else if (value === false) {
    isValid.value = false;
  }
}
function handleData(value) {
  if (value === true) {
    Data.value = true;
  } else if (value === false) {
    Data.value = false;
  }
}

function home() {
  store.resetEditData();
  router.push("/");
  store.isEditing = false;
  isValid.value = false;
  Data.value = false;
}
const activeStep = ref(0);
function nextStep() {
  if (activeStep.value < steps.length - 1) {
    if (
      (activeStep.value === 3 || activeStep.value === 4) &&
      Data.value === false
    ) {
      isValid.value = true;
      const notificationId = self.crypto.randomUUID();
      const notificationMessage = "Please Add Details";
      notifications.value.set(notificationId, notificationMessage);
      setTimeout(() => removeNotification(notificationId), 2000);
    } else {
      activeStep.value++;
      isValid.value = false;
      Data.value = false;
    }
  } else if (activeStep.value === steps.length - 1) {
    router.push("/");
  }
}
function prevStep() {
  if (activeStep.value > 0) {
    activeStep.value--;
  }
}

function removeNotification(notificationId) {
  notifications.value.delete(notificationId);
}
</script>

<style scoped>
.content-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 1em;
  overflow: hidden;
}
.icon1 {
  position: relative;
  justify-content: center;
  background: #f9f9f9;
  box-shadow: 0 0 0 1em #f9f9f9;
}
.content-wrap::before {
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  content: "";
  background-color: grey;
  height: 2px;
}
.cardColor {
  border-color: white important;
  position: sticky;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.notificationContainer {
  position: fixed;
  top: 110px;
  right: 10px;
  display: grid;
  grid-gap: 0.5em;
  z-index: 99;
}
</style>
