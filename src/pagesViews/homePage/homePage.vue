<template>
    <section class="homepage_container">
        <div class="homepage_header">头部</div>
        <div class="homepage_menu">
            <el-menu v-for="menu in newMenus" :key="menu.id" :router="true" :unique-opened=true default-active="2">
                <el-sub-menu :index="menu.id + ''">
                    <template #title>
                        <span>{{ menu.title }}</span>
                    </template>
                    <template v-for="submenu in menu.children" :key="submenu.id">
                        <el-menu-item v-if="!submenu.hidden" :index="'/' + menu.name +'/'+ submenu.name">
                            {{ submenu.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
            </el-menu>

        </div>
        <div class="homepage_content">
            <router-view></router-view>
        </div>
    </section>
</template>

<script setup lang="ts">
import {useStore} from 'vuex';
import {computed} from 'vue'
import {RouterView} from "vue-router";

interface MenuObj {
    parentId: number;
    id: number;
    title: string;
    hidden: 0 | 1;
    children?: MenuObj[];
    name: string;
}

interface NewMenus {
    [key: number]: MenuObj
}

const store = useStore();
const newMenus = computed<NewMenus>(() => store.getters.getNewMenus)


</script>

<style lang="less" scoped>
.homepage_container {
    position: relative;
    height: 100%;

    .homepage_header {
        height: 70px;
        background-color: rgb(79, 53, 53);
    }

    .homepage_menu {
        position: absolute;
        top: 70px;
        left: 0;
        bottom: 0;
        width: 250px;
        height: 100%;
        background-color: rgb(70, 31, 108);
    }

    .homepage_content {
        position: absolute;
        top: 70px;
        right: 0;
        left: 250px;
        bottom: 0;
        background-color: skyblue;
    }
}
</style>
