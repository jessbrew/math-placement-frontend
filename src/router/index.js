import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/questionnaire',
        name: 'Questionnaire',
        component: () => import('@/views/Questionnaire.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test.vue')
    },
    {
        path: '/completed',
        name: 'Completed',
        component: () => import('@/views/Completed.vue')
    },
    {
        path: '/login_admin',
        name: 'Administrator Login',
        component: () => import('@/views/Login_Admin.vue')
    },
    {
        path: '/admin',
        name: 'Administrator Overview',
        component: () => import('@/views/Admin.vue')
    },
    {
        path: '/admin-student-overview',
        name: 'Administrator Student Overview',
        component: () => import('@/views/AdminStudentOverview.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
