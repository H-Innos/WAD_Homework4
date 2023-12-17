import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactUsView from '../views/ContactUsView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import AddPostView from '../views/AddPostView.vue'
import APostView from '../views/APostView.vue'
import auth from "../auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/api/login')
        } else {
            next();
        }
    }
  },
  {
    path: '/api/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/api/contactUs',
    name: 'contactUs',
    component : ContactUsView
  }, 
  {
    path: '/api/addPost',
    name: 'addPost',
    component : AddPostView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/api/login')
        } else {
            next();
        }
    }
  },
  {
    path: "/api/apost/:id",
    name: "apost",
    component: APostView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/api/login')
        } else {
            next();
        }
    }
  },
  {
    path: "/api/login",
    name: "login",
    component: LoginView,
  },
  { //will route to AllPosts view if none of the previous routes apply
    path: "/:catchAll(.*)",
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/api/login')
        } else {
            next();
        }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
