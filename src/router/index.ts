import {App} from 'vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: "login",
        component: ()=> import('../pagesViews/login/login.vue')
    },
    {
        path: "/homepage",
        name: "homepage",
        component: ()=> import('../pagesViews/homePage/homePage.vue')
    },
    {
        path: "/",
        redirect:"/login",
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export const initRouter = (app: App<Element>) => {
    app.use(router);
}