<template>
  <div class="min-h-screen w-full flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">

    <div v-if="!login" class="px-8 py-6 z-20 bg-white rounded-xl bg-opacity-80 shadow-md">
      <p class="text-center font-semibold text-xl mb-6">用户登录</p>
      <p class="my-4">账号： <input class="border px-1" type="text" placeholder="请输入账号" v-model="userName"></p>
      <p class="my-4">密码： <input class="border px-1" type="password" placeholder="请输入密码" v-model="userPwd"></p>
      <div class="button-group mt-6 flex justify-center">
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="userLogin">登录</button>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
          @click="userRegister">注册</button>
      </div>
    </div>

    <div v-if="login && !pwdChagne" class="px-8 py-6 z-20 bg-white rounded-xl bg-opacity-80 shadow-md">
      <p class="mb-2">欢迎：{{userName}}</p>
      <p class="mb-4">IP地址：{{ip}}</p>
      <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="userLogout">注销</button>
      <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="pwdChagne = true">修改密码</button>
    </div>

    <div v-if="pwdChagne" class="px-8 py-6 z-50 bg-white rounded-xl bg-opacity-80 shadow-md">
      <p class="my-4">旧密码： <input class="border px-1" type="password" placeholder="请输入旧密码" v-model="oldPwd"></p>
      <p class="my-4">新密码： <input class="border px-1" type="password" placeholder="请输入新密码" v-model="newPwd"></p>
      <p class="my-4">重复新密码： <input class="border px-1" type="password" placeholder="请重复输入新密码" v-model="repNewPwd"></p>
      <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="userChgPwd">修改</button>
      <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="pwdChagne = false">取消</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie'
import * as Utils from './utils';
import hash from 'hash.js'
import { useToast } from 'vue-toastification';

const toast = useToast();
const userName = ref('')
const userPwd = ref('')
const oldPwd = ref('')
const newPwd = ref('')
const repNewPwd = ref('')
const apiUrl = 'http://localhost:3000/users/'
const login = ref(false)
const pwdChagne = ref(false)
const ip = ref('加载中')

if (Cookies.get('login') == '1') {
  login.value = true
  userName.value = Cookies.get('username') || ''
}

fetch('https://api.amarea.cn/getip/')
.then((response)=>{
  return response.text()
})
.then((ipaddress)=>{
  ip.value = ipaddress
})
.catch((err)=>{
  ip.value = '获取失败'
  console.log(err);
})

function userLogin() {
  fetch(apiUrl + userName.value, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then((response) => {
    if (!response.ok || response.status != 200) {
      if (response.status == 404) {
        toast.warning('登录失败')
      }
      console.log(response.ok, response.status);
      return 0
    }
    return response.json()
  }).then((res) => {
    if (res['password'] == hash.sha256().update('sec' + userPwd.value + 'ret').digest('hex')) {
      toast.success('登录成功')
      login.value = true
      Cookies.set('login', '1', { expires: 7 })
      Cookies.set('username', res['name'], { expires: 7 })
      Cookies.set('token', Utils.getRandomString(30), { expires: 7 })
    } else {
      toast.error('登录失败')
    }
  })
}

function userRegister() {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({ id: userName.value, name: userName.value, password: hash.sha256().update('sec' + userPwd.value + 'ret').digest('hex') })
  }).then((response) => {
    if (!response.ok || response.status != 201) {
      if (response.status == 500) {
        toast.warning('用户已存在')
      }
      toast.error('注册失败')
      console.log(response.ok, response.status);
      return 0
    } else {
      toast.success('注册成功')
    }
  })
}

function userLogout() {
  login.value = false
  userPwd.value = ''
  Cookies.remove('login')
  Cookies.remove('username')
  Cookies.remove('token')
  toast.success('注销成功')
}

function userChgPwd() {
  if (newPwd.value != repNewPwd.value || newPwd.value == '') {
    toast.warning('两次输入密码不同或密码非法，请检查输入')
    return 0
  }
  fetch(apiUrl + userName.value, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then((response) => {
    if (!response.ok || response.status != 200) {
      console.log(response.ok, response.status);
      return 0
    }
    return response.json()
  }).then((res) => {
    if (res['password'] == hash.sha256().update('sec' + oldPwd.value + 'ret').digest('hex')) {
      // alert('密码校验成功')
      fetch(apiUrl + userName.value, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ id: userName.value, name: userName.value, password: hash.sha256().update('sec' + newPwd.value + 'ret').digest('hex') })
      }).then((response) => {
        if (!response.ok || response.status != 200) {
          toast.error('修改失败，可能存在服务器错误')
        } else {
          toast.success('修改成功，请重新登录')
          pwdChagne.value = false
          userLogout()
        }
      })
    } else {
      toast.warning('旧密码输入错误')
    }
  })
}

</script>
