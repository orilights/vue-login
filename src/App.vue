<template>
  <div class="relative min-h-screen w-full flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
    <div v-if="loading"
      class="absolute w-full h-full flex items-center justify-center z-40 bg-white bg-opacity-80 select-none">
      <img class="w-20 h-20" src="./assets/loading_black.svg">
    </div>
    <div class="px-8 py-6 z-20 bg-white rounded-xl bg-opacity-80 shadow-md">

      <template v-if="!login">
        <p class="text-center font-semibold text-xl mb-6">用户登录</p>
        <p class="my-4">账号： <input class="border px-1 rounded-md" type="text" placeholder="请输入账号" v-model="userName">
        </p>
        <p class="my-4">密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入密码" v-model="userPwd">
        </p>
        <div class="button-group mt-6 flex justify-center">
          <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
            @click="userLogin">登录</button>
          <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
            @click="userRegister">注册</button>
        </div>
      </template>

      <template v-if="login && !pwdChagne">
        <p class="mb-2">欢迎：{{ userName }}</p>
        <p class="mb-4">IP地址：{{ ip }}</p>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="userLogout">注销</button>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="pwdChagne = true">修改密码</button>
      </template>

      <template v-if="pwdChagne">
        <p class="my-4">旧密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入旧密码"
            v-model="oldPwd">
        </p>
        <p class="my-4">新密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入新密码"
            v-model="newPwd">
        </p>
        <p class="my-4">重复新密码： <input class="border px-1 rounded-md" type="password" placeholder="请重复输入新密码"
            v-model="repNewPwd">
        </p>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="userChangePassword">修改</button>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="pwdChagne = false">取消</button>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie'
import * as Utils from './utils';
import { useToast } from 'vue-toastification';
import { UserRegister, UserLogin, UserChangePassword } from './api';

const toast = useToast();
const userName = ref('')
const userPwd = ref('')
const oldPwd = ref('')
const newPwd = ref('')
const repNewPwd = ref('')
const loading = ref(false)
const login = ref(false)
const pwdChagne = ref(false)
const ip = ref('加载中')


onMounted(() => {
  if (Cookies.get('login') == '1') {
    login.value = true
    userName.value = Cookies.get('username') || ''
  }
  fetch('https://api.amarea.cn/getip/')
    .then((response) => {
      return response.text()
    })
    .then((ipaddress) => {
      ip.value = ipaddress
    })
    .catch((err) => {
      ip.value = '获取失败'
      console.log(err);
    })
})

async function userLogin() {
  loading.value = true
  const result = await UserLogin(userName.value, userPwd.value)
  if (result.code == 0) {
    toast.clear()
    toast.success(result.msg)
    login.value = true
    Cookies.set('login', '1', { expires: 7 })
    Cookies.set('username', userName.value, { expires: 7 })
    Cookies.set('token', Utils.getRandomString(30), { expires: 7 })
  } else if (result.code = 2) {
    toast.warning(result.msg)
  } else if (result.code = 3) {
    toast.error(result.msg)
  }
  loading.value = false
}

async function userRegister() {
  loading.value = true
  const result = await UserRegister(userName.value, userPwd.value)
  if (result.code == 0) {
    toast.success(result.msg)
  } else if (result.code = 3) {
    toast.error(result.msg)
  }
  loading.value = false
}

async function userChangePassword() {
  if (newPwd.value != repNewPwd.value || newPwd.value == '') {
    toast.warning('两次输入密码不同或密码非法，请检查输入')
    return 0
  }
  loading.value = true
  const result = await UserChangePassword(userName.value, oldPwd.value, newPwd.value)
  if (result.code == 0) {
    toast.success(result.msg)
    userLogout()
  } else if (result.code = 3) {
    toast.error(result.msg)
  }
  loading.value = false
}

function userLogout() {
  login.value = false
  pwdChagne.value = false
  userPwd.value = ''
  oldPwd.value = ''
  newPwd.value = ''
  repNewPwd.value = ''
  Cookies.remove('login')
  Cookies.remove('username')
  Cookies.remove('token')
  toast.success('注销成功')
}

</script>
