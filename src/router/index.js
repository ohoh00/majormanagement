import Vue from 'vue'
import VueRouter from 'vue-router'
import uploadexcel from '../views/upload-excel.vue'
import dashboard from '../views/Dashboard.vue'
import majorsetting from '../views/Majorsetting.vue'
import management from '../views/Management.vue'
import students from '../views/Students.vue'
import login from '../views/Login.vue'
import adduser from '../views/Adduser.vue' 

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard',
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
  {
    path: '/adduser',
    name: 'adduser',
    component: adduser
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
