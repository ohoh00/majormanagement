import Vue from 'vue'
import VueRouter from 'vue-router'
import uploadexcel from '../views/upload-excel.vue'
import dashboard from '../views/Dashboard.vue'
import read from '../components/Readdatatest.vue'
import majorsetting from '../views/Majorsetting.vue'
import management from '../views/Management.vue'

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
    path: '/test',
    name: 'test',
    component: read
  }, 
  {
    path: '/setting',
    name: majorsetting,
    component: majorsetting
  },
  {
    path: '/management',
    name: management,
    component: management
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
