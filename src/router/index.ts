import Cookies from 'js-cookie';
import {App} from 'vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {store} from '../store'


const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: "login",
        component: () => import('../pagesViews/login/login.vue')
    },
    {
        path: "/homepage",
        name: "homepage",
        component: () => import('../pagesViews/homePage/homePage.vue')
    },
    // {
    //     path: "/pms",
    //     name: 'pms',
    //     component: () => import('../pagesViews/homePage/homePage.vue'),
    //     children: [
    //         {
    //             path: "product",
    //             name: "product",
    //             component: () => import('../pagesViews/pms/product.vue')
    //         }
    //     ]
    // },
    {
        path: "/",
        redirect: "/login",
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})


//前置导航守卫
router.beforeEach((to, from, next) => {
    //token&&vuex里面menus为空
    console.log(store);

    const token = Cookies.get('token');
    if (token && store.state.menus.length === 0) {

        //异步要写then里面
        store.dispatch('getAdminInfo').then(() => {
            //动态生成路由
            const menus = store.getters.getNewMenus
            // const newRoutes: RouteRecordRaw[] = [];

            for (const key in menus) {
                const newRoute: RouteRecordRaw = {
                    path: '/' + menus[key].name,
                    name: menus[key].name,
                    component: () => import('../pagesViews/homePage/homePage.vue'),
                    children: []
                }
                for (let i = 0; i < menus[key].children.length; i++) {
                    newRoute.children?.push({
                        path: menus[key].children[i].name,
                        name: menus[key].children[i].name,
                        component: () => import(`../pagesViews/${menus[key].name}/${menus[key].children[i].name}.vue`)
                    })
                }
                //添加路由规则
                router.addRoute(newRoute);
            }
            next(to.path);
        });
    } else {
        next();
    }
})
export const initRouter = (app: App<Element>) => {
    app.use(router);
}
