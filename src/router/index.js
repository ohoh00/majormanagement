import Vue from 'vue'
import VueRouter from 'vue-router'
import uploadexcel from '../views/upload-excel.vue'
import dashboard from '../views/Dashboard.vue'
import read from '../components/Readdatatest.vue'


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
    path: '/read',
    name: 'read',
    component: read
  }, 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
