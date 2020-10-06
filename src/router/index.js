import Vue from 'vue'
import VueRouter from 'vue-router'
import uploadexcel from '../views/upload-excel.vue'
import dashboard from '../views/Dashboard.vue'
import majorsetting from '../views/Majorsetting.vue'
import management from '../views/Management.vue'
import students from '../views/Students.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/uploadexcel',
    name: 'uploadexcel',
    component: uploadexcel
  },
  {
    path: '/setting',
    name: 'majorsetting',
    component: majorsetting
  },
  {
    path: '/management',
    name: 'management',
    component: management
  },
  {
    path: '/students',
    name: 'students',
    component: students
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
