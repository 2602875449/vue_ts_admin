<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="loginFn()">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue';
import Cookies from 'js-cookie'
import {adminLoginApi} from '../../api/user'
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';


const state = reactive({
    ruleForm: {
        username: "admin",
        pwd: "123456",
    }
})

//自定义检验规则
const validateUsername = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
    if (!value) {
        cb("账号不能为空！");
    } else {
        cb();
    }
}

let { ruleForm } = toRefs(state);
//获取el-form组件对象
let ruleFormRef = ref();
let router = useRouter();
let store = useStore();
const validatePwd = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
    if (!value) {
        cb("密码不能为空！");
    } else {
        cb();
    }

}

const rules = reactive({
    username: [
        { validator: validateUsername, trigger: 'blur' },
    ],
    pwd: [
        { validator: validatePwd, trigger: 'blur' }
    ],
})


//点击登录触发的
const loginFn = () => {
    ruleFormRef.value.validate().then(() => {
        adminLoginApi({
            password: ruleForm.value.pwd,
            username: ruleForm.value.username,
        }).then(res => {
            if (res.code === 200) {
                //先存储token
                Cookies.set('token', res.data.tokenHead + res.data.token, {expires: 7});
                store.dispatch('getAdminInfo').then(res => {
                    router.push('/homepage');
                })
            }
        })
    }).catch(() => {
        console.log('校验不通过！');
    })
}

</script>

<style scoped>

</style>
