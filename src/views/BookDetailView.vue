<script setup>
import { ref, onMounted } from "vue"
import { ServiceGetBook } from "../api/book"
import { useRoute } from "vue-router"
import { ElMessage } from "element-plus"
import HeaderFill from "../components/HeaderFill.vue"
import { ServiceAddBookToBookshelf } from "../api/bookshelf"
import { useUserStore } from "@/stores"

const userStore = useUserStore()
const route = useRoute()

const item = ref({})
const dataLoad = () => {
  ServiceGetBook({
    bookName: route.params.bookName
  }).then((res) => {
    item.value = res
  })
}

const rating = ref(5)
const getBookRating = () => {}

onMounted(() => {
  dataLoad()
})

const addBook = (bid) => {
  ServiceAddBookToBookshelf({
    uid: userStore.id,
    bid: bid
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  })
}
</script>

<template>
  <div>
    <HeaderFill />
    <div class="content">
      <div class="content-header container">
        <div class="content-header-router">
          <router-link to="/home">首页</router-link>
          <router-link to="">{{ item.name }}</router-link>
        </div>
        <div class="content-header-info flex">
          <div class="left flex">
            <div v-if="item.name" class="book-cover">
              <img :src="`http://localhost/book-cover/${item.name}`" alt="" />
            </div>
            <div class="info">
              <div class="info-name">
                <h1>{{ item.name }}</h1>
              </div>
              <div class="info-type">
                <p>{{ item.type }}</p>
              </div>
              <div class="info-action">
                <el-button round>立即阅读</el-button>
                <el-button type="primary" round @click="addBook(item.id)">加入书架</el-button>
              </div>
            </div>
          </div>
          <div class="right flex">
            <div class="divider"></div>
            <div class="rate-block">
              <span class="demonstration">当前评分</span>
              <el-popover
              placement="top-start"
              title="警告"
              :width="200"
              trigger="hover"
              content="评分只能进行一次，请谨慎！"
            >
              <template #reference>
                <el-rate disabled v-model="rating" />
              </template>
            </el-popover>
            </div>
            <div class="auther flex">
              <div class="face">
                <img src="http://localhost/avatar/默认头像" alt="" />
              </div>
              <div class="name flex">
                <img class="name-logo" src="../assets/作者.svg" alt="" />
                <span class="name-text">{{ item.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="container">
          <div class="introduction-header">
            <h2>作品简介</h2>
          </div>
          <div class="introduction-content flex">
            <p>{{ item.synopsis }}</p>
          </div>
          <!-- <div class="directory-header">
            <h2>
              <span>目录</span>
              <span>/</span>
              <span>24</span>
              <span>章节</span>
            </h2>
          </div>
          <div class="directory-content">
            <ul>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
              <li><span>第一章</span><a href="">桃园三结义</a></li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-header .content-header-router {
  height: 40px;
  background-color: white;
}

.content-header .content-header-router a {
  font-size: 14px;
  line-height: 40px;
  color: #000;
}

.content-header .content-header-router a:last-child {
  color: rgba(0, 0, 0, 0.4);
}

.content-header .content-header-router a:last-child::before {
  content: '/';
  margin-left: 4px;
  margin-right: 4px;
}

.content-header .content-header-info {
  justify-content: space-between;
  height: 300px;
  background-color: white;
  align-items: center;
}

.content-header .content-header-info .book-cover {
  width: 180px;
  height: 240px;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
}

.content-header-info .book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-header .content-header-info .info {
  margin-left: 20px;
}

.content-header-info .info-action {
  margin-top: 140px;
}

.content-header .content-header-info .divider {
  margin: 0 15px;
  height: 200px;
  vertical-align: middle;
  border-right: 2px solid rgba(0, 0, 0, 0.3);
}

.content-header .content-header-info .right {
  justify-content: center;
}

.content-header .content-header-info .auther {
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 100px 0 40px;
}

.content-header-info .info-name h1 {
  color: #444;
}

.content-header-info .info-type p {
  color: #888;
}

.content-header-info .auther .face {
  height: 70px;
  width: 70px;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.5);
  justify-content: center;
}

.content-header-info .auther .face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-header-info .auther .name {
  justify-content: center;
  align-items: center;
}

.content-header-info .auther .name .name-text {
  font-size: 20px;
  color: #444;
}

.content-body {
  padding: 40px 0;
  background-color: rgba(0, 0, 0, 0.05);
}

.content-body .container {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
}

.content-body > div {
  background-color: white;
  overflow: hidden;
}

.content-body .introduction-header {
  height: 40px;
}

.content-body .introduction-header h2 {
  margin: 20px 20px 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  color: #666;
}

.content-body .introduction-content {
  height: 120px;
  align-items: center;
}

.content-body .introduction-content p {
  margin: 0px 40px;
  color: #666;
}
.content-body .introduction-content p::before {
  content: '\2003\2003';
}

.content-body .directory-header {
  height: 40px;
}

.content-body .directory-header h2 {
  margin: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.content-body .directory-content ul {
  margin: 20px 40px;
  column-count: 3;
}

.directory-content ul li {
  font-size: 14px;
  padding: 5px 0;
}

.directory-content ul a {
  padding: 0 5px;
  color: #000;
}
</style>
