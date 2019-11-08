import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/task',
    component: Home,

    children: [

        { path: "/major", name: "marjor" },
        { path: "/done", name: "done" },
        { path: "/task", name: "task" },
    ]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router