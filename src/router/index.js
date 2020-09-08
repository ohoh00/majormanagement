import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import uploadexcel from '../views/upload-excel.vue'
import read from '../components/Readdatatest.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'uploadexcel',
    component: uploadexcel
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
