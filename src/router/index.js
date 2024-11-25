import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CreateBlog from '@/views/CreateBlogView.vue'
import BlogView from '@/views/BlogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/blog/:id',
      name: 'blog/:id',
      component: BlogView,
    },
    {
      path: '/blog/create',
      name: 'blog.create',
      component: CreateBlog,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

export default router
