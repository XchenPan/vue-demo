<script setup>
import { ref, onMounted } from "vue"
import { ServiceGetBook } from "../api/book"
import { ServiceGetComments, ServiceCreateNewComment } from "../api/comment"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import HeaderFill from "../components/HeaderFill.vue"
import { ServiceAddBookToBookshelf } from "../api/bookshelf"
import { useUserStore } from "@/stores"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const item = ref({})
const dataLoad = () => {
  ServiceGetBook({
    bookName: route.params.bookName
  }).then((res) => {
    item.value = res
  }).finally(() => {
    commentsLoad()
  })
}

const rating = ref(5)
const getBookRating = () => {}

const comments = ref({})
const commentsLoad = () => {
  ServiceGetComments({
    bid: item.value.id
  }).then((res) => {
    comments.value = res
  })
}

onMounted(() => {
  dataLoad()
})

const addBook = (bid) => {
  if (!userStore.id) {
    router.push("/auth/login")
    ElMessage({ showClose: true, message: "请先登录", type: "warning" })
    return
  }
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

const newComment = ref("")
const handleAddNewComment = () => {
  if (newComment.value.length == 0) {
    ElMessage({ showClose: true, message: "请输入留言内容", type: "warning" })
    return
  }
  ServiceCreateNewComment({
    bid: item.value.id,
    username: userStore.username,
    content: newComment.value
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  }).finally(() => {
    dataLoad()
    newComment.value = ""
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
            <div class="rate-block flex">
              <span class="demonstration">当前评分:</span>
              <el-popover
                placement="top-start"
                title="警告"
                :width="200"
                trigger="hover"
                content="评分只能进行一次，请谨慎！"
              >
                <template #reference>
                  <el-rate v-model="rating" />
                </template>
              </el-popover>
            </div>
            <div class="divider"></div>
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
          <div class="introduction">
            <div class="introduction-header">
              <h2>作品简介</h2>
            </div>
            <div class="introduction-content flex">
              <p>{{ item.synopsis }}</p>
            </div>
          </div>
          <div class="comment">
            <div class="comment-header">
              <h2>留言板</h2>
            </div>
            <div class="comment-content">
              <div v-for="item in comments.data" :key="item" class="user-comment flex">
                <span>{{ item.username }} 回复说:</span>
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div class="comment-action flex">
              <el-input type="text" v-model="newComment" placeholder="请输入留言内容" />
              <el-button type="primary" @click="handleAddNewComment()">添加</el-button>
            </div>
          </div>
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

.rate-block {
  align-items: center;
}
.rate-block span {
  color: #444;
  padding: 20px;
}
.comment h2 {
  margin: 20px 20px 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  color: #666;
}
.comment-content {
  padding: 0 40px;
}
.comment-content span {
  color: #444;
}
.comment-content p {
  color: #888;
}
.comment-action {
  justify-content: right;
  padding: 20px;
}
</style>
