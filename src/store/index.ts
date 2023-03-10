import {App} from 'vue'
import {createStore} from 'vuex'
import {amdinInfoApi} from '../api/user'

interface MenuObj {
    parentId: number;
    id: number;
    children?: MenuObj[];
}

interface State {
    menus: MenuObj[]
}
interface NewMenus {
    [key: number]: MenuObj
}


export const store = createStore<State>({
    state() {
        return {
            menus: [],
        }
    },
    getters: {
        getNewMenus(state) {
            const newMenus: NewMenus = {};

            //获取旧的菜单
            const menus = state.menus;

            for (let i = 0; i < menus.length; i++) {
                if (menus[i].parentId === 0) {
                    // 一级菜单
                    newMenus[menus[i].id] = { ...menus[i], children: newMenus[menus[i].id]?.children || [] }
                } else {
                    let parentId = menus[i].parentId;
                    newMenus[parentId] = newMenus[parentId] || {}
                    newMenus[parentId].children = newMenus[parentId].children || []
                    newMenus[parentId].children?.push(menus[i]);
                }
            }

            return newMenus;
        }
    },
    mutations: {
        updateMenus(state, menus) {
            state.menus = menus
        }
    },
    actions: {
        getAdminInfo({commit}) {
            return new Promise((resolve, reject) => {
                amdinInfoApi().then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        commit('updateMenus', res.data.menus);
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                })
            })
        }
    },
    modules: {},
})


export const initStore = (app: App<Element>) => {
    app.use(store);
}
