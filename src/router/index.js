import Vue from 'vue'
import VueRouter from 'vue-router'
const dashboard = () => import('@/views/Dashboard.vue')
const uploadexcel = () => import('@/views/upload-excel.vue')
const majorsetting = () => import('@/views/Majorsetting.vue')
const management = () => import('@/views/Management.vue')
const students = () => import('@/views/Students.vue')
const login = () => import('@/views/Login.vue')
const adduser = () => import('@/views/Adduser.vue')

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
