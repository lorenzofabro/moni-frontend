import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Pedido from '../views/Pedido.vue'
import Pedidos from '../views/Pedidos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/pedido/',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/pedidos/',
    name: 'Pedidos',
    component: Pedidos,
    meta: { requireAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requireAuth);
  if (protectedRoute && store.state.token === '') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
