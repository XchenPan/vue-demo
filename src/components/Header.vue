<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import Avatar from "./Avatar.vue"
import { useUserStore } from "@/stores"

const userStore = useUserStore()

const props = defineProps(["addActiveClass"])
const router = new useRouter()

const text = ref("")
const handleSubmit = () => {
  const searchText = text.value
  text.value = ""
  router.push({
    name: "search",
    query: {
      query: searchText
    }
  })
}
</script>

<template>
  <div class="header" :class="{ 'scrolled-down': addActiveClass }">
    <div class="container flex">
      <div class="header-left flex">
        <div class="logo">
          <router-link to="/home" active-class="active"
            ><img src="../assets/logo.svg" alt=""
          /></router-link>
        </div>
        <div class="title flex">
          <div class="top"><router-link to="/home">大橘子</router-link></div>
          <div class="bottom"><router-link to="/home">在线图书推荐与交流平台</router-link></div>
        </div>
        <div class="divider"></div>
        <div class="header-menu">
          <ul class="header-menu-nav flex">
            <li><router-link to="/home" active-class="active">首页</router-link></li>
            <li><router-link to="/books" active-class="active">书库</router-link></li>
            <li><router-link to="/bookshelf" active-class="active">书架</router-link></li>
            <li><router-link to="/writer" active-class="active">作家专区</router-link></li>
          </ul>
        </div>
      </div>
      <div class="header-right flex">
        <div class="header-right-search">
          <form @submit.prevent="handleSubmit">
            <input type="text" class="search" placeholder="请输入书名或作者名" v-model="text" />
            <button class="btn"></button>
          </form>
        </div>
        <div class="divider"></div>
        <Avatar v-if="userStore.id" />
        <div class="user-action" v-else>
          <span><router-link to="/auth/login">登录</router-link></span>
          <span><router-link to="/auth/register">注册</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 头部 */
.header {
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  transition: all 0.3s ease;
}

.header .container {
  justify-content: space-between;
  height: 70px;
  align-items: center;
}

.header-left {
  align-items: center;
}

.header-left .title {
  flex-direction: column;
  justify-content: center;
}

.header-left .title a {
  font-size: 20px;
  color: black;
}

.header-left .logo img {
  height: 60px;
}

.divider {
  margin: 0 15px;
  height: 40px;
  border-right: 2px solid rgba(0, 0, 0, 0.3);
}

.header-left div span {
  font-size: 18px;
}

.header-menu-nav li a {
  padding: 20px;
  color: black;
}

.header-right {
  align-items: center;
}

.header-right-search form {
  position: relative;
}

.header-right-search .search {
  width: 250px;
  height: 40px;
  border-radius: 18px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 20px;
  padding-right: 40px;
}

.header-right-search .btn {
  height: 28px;
  width: 28px;
  background: url('../assets/搜索.svg') no-repeat;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  left: 215px;
  top: 5px;
  transition-duration: 0.3s;
}

.header-right-search .btn:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.header-right .login ul {
  justify-content: center;
}

.header-right .login {
  width: 120px;
}

.header-right .login li:last-child a {
  margin: 0 10px;
}

.scrolled-down {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.user-action a {
  color: #333;
  margin: 0 5px;
}

.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
