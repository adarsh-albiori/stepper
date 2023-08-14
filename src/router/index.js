import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import StepperComp from "../components/StepperComp.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/stepper',
    name: 'stepper',
    component: StepperComp
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
